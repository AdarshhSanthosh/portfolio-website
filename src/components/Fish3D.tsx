import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Served from /public - not a src asset import, so it isn't hashed/bundled.
const MODEL_URL = `${import.meta.env.BASE_URL}models/betta-fish.glb`;
const MODEL_TARGET_SIZE = 3.4; // world units, matches the previous fish's scale

// Loads the decimated betta-fish GLB, centers it on its own bounding box,
// and scales it to a consistent size regardless of the source mesh's units.
async function loadBettaModel(): Promise<THREE.Group> {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(MODEL_URL);
  const root = gltf.scene;

  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  root.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const wrapper = new THREE.Group();
  wrapper.add(root);
  wrapper.scale.setScalar(MODEL_TARGET_SIZE / maxDim);

  // This sculpt is a fully 3D asymmetric pose (not a flat side-view
  // fish) - only a narrow range of Y-rotation reads as a clean profile.
  // This is that angle, found by rendering the model at a spread of
  // angles and comparing screenshots.
  wrapper.rotation.y = Math.PI;

  return wrapper;
}

// Minimal fallback shape shown if the GLB fails to load (offline, blocked
// request, etc.) so the scene never renders completely empty.
function buildFallbackFish(): THREE.Group {
  const fish = new THREE.Group();
  const bodyGeo = new THREE.SphereGeometry(1, 24, 16);
  bodyGeo.scale(1.6, 1, 0.5);
  const bodyMat = new THREE.MeshPhysicalMaterial({ color: 0x6b46b8, roughness: 0.35, clearcoat: 0.5 });
  fish.add(new THREE.Mesh(bodyGeo, bodyMat));
  return fish;
}

const easeInOut = (t: number) => t * t * (3 - 2 * t);

// The betta model is a single static sculpt (no rig/bones), so the fins
// can't be posed frame-to-frame. Instead this gives every material a
// vertex-shader ripple: displacement grows with distance from the mesh's
// own center, so the compact body stays rigid while the flowing fin tips
// sway - a cheap stand-in for real fin motion. Returns the per-material
// time uniforms so the caller can drive them each frame.
function addFinRipple(model: THREE.Object3D): { value: number }[] {
  const timeUniforms: { value: number }[] = [];

  model.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    obj.geometry.computeBoundingBox();
    const bbox = obj.geometry.boundingBox;
    if (!bbox) return;
    const center = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
    materials.forEach((mat) => {
      const uTime = { value: 0 };
      timeUniforms.push(uTime);

      mat.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
        shader.uniforms.uTime = uTime;
        shader.uniforms.uCenter = { value: center.clone() };
        shader.uniforms.uInner = { value: maxDim * 0.30 };
        shader.uniforms.uOuter = { value: maxDim * 0.68 };
        shader.uniforms.uAmp = { value: maxDim * 0.06 };
        shader.uniforms.uFreq = { value: 5.5 / maxDim };

        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            `#include <common>
            uniform float uTime;
            uniform vec3 uCenter;
            uniform float uInner;
            uniform float uOuter;
            uniform float uAmp;
            uniform float uFreq;`,
          )
          .replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
            {
              vec3 rel = position - uCenter;
              float dist = length(rel);
              float weight = smoothstep(uInner, uOuter, dist);
              vec3 dir = dist > 0.0001 ? normalize(rel) : vec3(0.0, 0.0, 1.0);
              float wave = sin(uTime * 2.0 + rel.y * uFreq * 6.2831853)
                + 0.35 * sin(uTime * 3.4 - rel.x * uFreq * 4.0);
              transformed += dir * wave * uAmp * weight;
            }`,
          );
      };
      mat.needsUpdate = true;
    });
  });

  return timeUniforms;
}

export default function Fish3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // no WebGL available - fail quietly, water background still shows
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const FRUSTUM_WIDTH = 16;
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 100);
    const updateCamera = () => {
      const aspect = window.innerWidth / window.innerHeight;
      const halfH = FRUSTUM_WIDTH / 2 / aspect;
      camera.left = -FRUSTUM_WIDTH / 2;
      camera.right = FRUSTUM_WIDTH / 2;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    };
    updateCamera();
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0x99aadd, 0.65));
    const key = new THREE.DirectionalLight(0xfff2e0, 1.2);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x8fd6ff, 0.8);
    rimLight.position.set(-4, 1, -3);
    scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0x6688cc, 0.4);
    fillLight.position.set(0, -3, 4);
    scene.add(fillLight);

    const fish = new THREE.Group();
    scene.add(fish);

    let disposeModel: (() => void) | null = null;
    let finTimeUniforms: { value: number }[] = [];
    loadBettaModel()
      .then((model) => {
        if (cancelled) return;
        fish.add(model);
        if (!reduceMotion) {
          finTimeUniforms = addFinRipple(model);
        }
        disposeModel = () => {
          model.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((m) => m.dispose());
            }
          });
        };
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = buildFallbackFish();
        fish.add(fallback);
        disposeModel = () => {
          fallback.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry.dispose();
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((m) => m.dispose());
            }
          });
        };
      });

    const onResize = () => {
      updateCamera();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let scrollOffsetWorld = 0;
    let rafScroll = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafScroll);
      rafScroll = requestAnimationFrame(() => {
        const worldPerPixel = (camera.top - camera.bottom) / window.innerHeight;
        const cappedPx = Math.min(window.scrollY * 0.25, 260);
        scrollOffsetWorld = -cappedPx * worldPerPixel;
      });
    };

    let rafId = 0;
    const start = performance.now();

    const renderStatic = () => {
      fish.position.set(-2, 1.5, 0);
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      renderStatic();
      // the model loads async - render again once it's in so it's not blank
      const staticRaf = requestAnimationFrame(renderStatic);
      rafId = staticRaf;
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      const cycle = 38;
      const xLeft = -7.2;
      const xRight = 6.8;

      const tick = (now: number) => {
        rafId = requestAnimationFrame(tick);
        const t = (now - start) / 1000;
        const phase = (t % cycle) / cycle;
        const goingRight = phase < 0.5;
        const local = goingRight ? phase / 0.5 : (phase - 0.5) / 0.5;
        const eased = easeInOut(local);

        // Whole-body motion: swim across the screen and bob gently.
        fish.position.x = goingRight
          ? THREE.MathUtils.lerp(xLeft, xRight, eased)
          : THREE.MathUtils.lerp(xRight, xLeft, eased);
        // Keep the model's one good viewing angle fixed and mirror it
        // for direction changes instead of rotating (rotating would
        // sweep through much less flattering angles) - the same trick
        // as flipping a 2D sprite.
        fish.scale.x = goingRight ? 1 : -1;

        const bob = Math.sin(t * 0.9) * 0.45 + Math.sin(t * 1.7) * 0.12;
        fish.position.y = bob + 1.2 + scrollOffsetWorld;
        fish.rotation.z = Math.sin(t * 0.9) * 0.05 * (goingRight ? 1 : -1);

        // Fin/tail motion: the shader ripple, weighted by distance from
        // the mesh's own center so only the fins/tail actually move.
        for (const u of finTimeUniforms) u.value = t;

        renderer.render(scene, camera);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      disposeModel?.();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
