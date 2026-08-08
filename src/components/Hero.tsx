import { ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { profile } from "../data/content";
import profileImg from "../assets/profile.jpg";

export default function Hero() {
  const firstName = profile.name.split(" ")[0];

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2"
    >
      {/* Text column */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-32 md:py-24 order-2 md:order-1">
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-accent mb-6">
          {profile.title}
        </p>

        <h1 className="font-display font-bold uppercase text-foreground leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
          Hey, I'm <span className="text-accent">{firstName}</span>.
          <br />
          I Build Things That Matter.
        </h1>

        <p className="mt-5 font-display text-xl sm:text-2xl text-muted-foreground">
          Creating With Code, Driven by Curiosity.
        </p>

        <p className="mt-8 max-w-md border-l-2 border-accent pl-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Full stack developer specializing in AI-powered products and
          Shopify e-commerce — turning complex ideas into reliable, polished
          experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-4 rounded-full bg-primary pl-6 pr-1.5 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View my work
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-white text-primary">
              <ArrowRight size={16} />
            </span>
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
          >
            or get in touch
          </a>
        </div>

        <div className="mt-12 flex items-center gap-5 text-muted-foreground">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground transition-colors"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-foreground transition-colors"
          >
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>

      {/* Image column */}
      <div className="relative order-1 md:order-2 h-[50vh] md:h-auto">
        {/* Ghost watermark text */}
        <span
          className="hidden md:block absolute top-10 right-0 font-display font-bold uppercase select-none pointer-events-none whitespace-nowrap"
          style={{
            fontSize: "9rem",
            color: "transparent",
            WebkitTextStroke: "1px oklch(95% 0.01 240 / 8%)",
          }}
        >
          {firstName}
        </span>

        <img
          src={profileImg}
          alt={profile.name}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            filter: "grayscale(1) contrast(1.1) brightness(0.85)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 45%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 45%)",
          }}
        />

        {/* Tonal blend + shadow so the cutout dissolves into the dark background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, oklch(7% 0.02 264) 0%, transparent 40%)",
            boxShadow: "inset 0 0 8rem 2rem rgba(0,0,0,0.6)",
          }}
        />
      </div>
    </section>
  );
}
