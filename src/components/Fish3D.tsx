import { useEffect, useRef } from "react";
import * as THREE from "three";

// Builds the fish as a THREE.Group: a lathed, laterally-compressed body
// (round cross-section flattened in depth, like a real fish silhouette),
// plus fin/eye/mouth meshes attached to it. Local +X = nose, -X = tail.
function buildFish() {
  const fish = new THREE.Group();

  // ---- body: revolve a profile curve, then flatten it in depth ----
  const profile = [
    [0.03, 0],
    [0.32, 0.18],
    [0.62, 0.5],
    [0.8, 0.85],
    [0.85, 1.15],
    [0.78, 1.5],
    [0.6, 1.9],
    [0.4, 2.3],
    [0.22, 2.7],
    [0.1, 3.05],
    [0.0, 3.3],
  ].map(([r, y]) => new THREE.Vector2(r, y));

  const bodyGeo = new THREE.LatheGeometry(profile, 28);
  bodyGeo.rotateZ(Math.PI / 2); // revolve axis (Y) -> nose/tail axis (X)
  bodyGeo.translate(1.65, 0, 0); // center: nose ~+1.65, tail-base ~-1.65
  bodyGeo.scale(1, 1, 0.45); // flatten depth for a side-view silhouette
  bodyGeo.computeVertexNormals();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x2fb0c4,
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
    sheen: 1,
    sheenColor: new THREE.Color(0x9fe8ff),
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  fish.add(body);

  // ---- eye: layered flat discs facing the camera ----
  const eye = new THREE.Group();
  eye.position.set(1.18, 0.32, 0.3);
  const circle = (r: number, color: number, z: number, opts: { basic?: boolean } = {}) => {
    const mat = opts.basic
      ? new THREE.MeshBasicMaterial({ color })
      : new THREE.MeshStandardMaterial({ color, roughness: 0.35 });
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 20), mat);
    m.position.z = z;
    return m;
  };
  eye.add(circle(0.26, 0xf5fbff, 0));
  eye.add(circle(0.17, 0xa974c9, 0.01));
  eye.add(circle(0.09, 0x0c1220, 0.02));
  const highlight = circle(0.035, 0xffffff, 0.03, { basic: true });
  highlight.position.x = -0.07;
  highlight.position.y = 0.08;
  eye.add(highlight);
  fish.add(eye);

  // ---- mouth ----
  const mouth = new THREE.Mesh(
    new THREE.CircleGeometry(0.15, 16, Math.PI * 0.15, Math.PI * 0.9),
    new THREE.MeshStandardMaterial({ color: 0x1c2a3d, side: THREE.DoubleSide }),
  );
  mouth.position.set(1.66, -0.08, 0.27);
  fish.add(mouth);

  // ---- dorsal fin (ribbed, orange), swept over the mid-back ----
  const dorsalShape = new THREE.Shape();
  dorsalShape.moveTo(0.15, 0.7);
  dorsalShape.lineTo(-0.15, 1.42);
  dorsalShape.lineTo(-0.78, 1.62);
  dorsalShape.lineTo(-0.62, 1.0);
  dorsalShape.lineTo(-0.3, 0.74);
  dorsalShape.closePath();
  const dorsalGeo = new THREE.ExtrudeGeometry(dorsalShape, { depth: 0.05, bevelEnabled: false });
  dorsalGeo.translate(0, 0, -0.025);
  const finMat = new THREE.MeshPhysicalMaterial({ color: 0xf3944a, roughness: 0.45, clearcoat: 0.4 });
  fish.add(new THREE.Mesh(dorsalGeo, finMat));

  // ---- pectoral fin (translucent teal, more visible) ----
  const pecShape = new THREE.Shape();
  pecShape.moveTo(0, 0);
  pecShape.lineTo(0.45, -0.58);
  pecShape.lineTo(0.64, -0.9);
  pecShape.lineTo(0.06, -0.38);
  pecShape.closePath();
  const pecGeo = new THREE.ExtrudeGeometry(pecShape, { depth: 0.04, bevelEnabled: false });
  pecGeo.translate(0, 0, -0.02);
  const pecMat = new THREE.MeshPhysicalMaterial({
    color: 0x7fe8d2,
    roughness: 0.4,
    transparent: true,
    opacity: 0.95,
  });
  const pectoral = new THREE.Mesh(pecGeo, pecMat);
  pectoral.position.set(0.2, -0.15, 0.32);
  fish.add(pectoral);

  // ---- ventral thread fins (thin, trailing, orange) ----
  for (const x of [0.85, 0.4]) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.035, 0);
    shape.lineTo(0.035, 0);
    shape.lineTo(0.09, -0.95);
    shape.lineTo(-0.02, -0.98);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false });
    geo.translate(0, 0, -0.015);
    const fin = new THREE.Mesh(geo, finMat);
    fin.position.set(x, -0.65, 0.28);
    fish.add(fin);
  }

  // ---- tail fin: two lobes, pivoting group for the wag animation ----
  const tail = new THREE.Group();
  tail.position.set(-1.48, 0, 0); // overlaps the tapered tail-base for a seamless join
  fish.add(tail);

  const tailLobe = (sign: 1 | -1, color: number) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, sign * 0.12);
    shape.lineTo(-0.95, sign * 0.85);
    shape.lineTo(-1.1, sign * 0.55);
    shape.lineTo(-0.2, sign * 0.05);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
    geo.translate(0, 0, -0.02);
    const mat = new THREE.MeshPhysicalMaterial({ color, roughness: 0.4, clearcoat: 0.3 });
    return new THREE.Mesh(geo, mat);
  };
  tail.add(tailLobe(1, 0x8fd66b));
  tail.add(tailLobe(-1, 0xe2672a));

  return { fish, tail };
}

const easeInOut = (t: number) => t * t * (3 - 2 * t);

export default function Fish3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

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

    scene.add(new THREE.AmbientLight(0x88bbdd, 0.6));
    const key = new THREE.DirectionalLight(0xfff2e0, 1.1);
    key.position.set(3, 5, 6);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0x66e0ff, 0.7);
    rimLight.position.set(-4, 1, -3);
    scene.add(rimLight);

    const { fish, tail } = buildFish();
    fish.scale.setScalar(0.62);
    scene.add(fish);

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

        fish.position.x = goingRight
          ? THREE.MathUtils.lerp(xLeft, xRight, eased)
          : THREE.MathUtils.lerp(xRight, xLeft, eased);
        fish.rotation.y = goingRight ? 0 : Math.PI;

        const bob = Math.sin(t * 0.9) * 0.45 + Math.sin(t * 1.7) * 0.12;
        fish.position.y = bob + 1.2 + scrollOffsetWorld;
        fish.rotation.z = Math.sin(t * 0.9) * 0.05 * (goingRight ? 1 : -1);

        tail.rotation.z = Math.sin(t * 5.5) * 0.22;

        renderer.render(scene, camera);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
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
