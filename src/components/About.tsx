import { about, profile } from "../data/content";
import aboutImg from "../assets/about-illustration.webp";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[1fr_1.4fr] gap-12 items-center">
        <div className="flex justify-center md:justify-start">
          <div className="rounded-2xl border border-border bg-card p-2 max-w-xs">
            <img
              src={aboutImg}
              alt={`Illustration of ${profile.name} working with AI tools`}
              className="rounded-xl w-full h-auto"
            />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm font-mono text-accent mb-3">About</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-6">
            {about.title}
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            📍 {profile.location}
          </p>
        </div>
      </div>
    </section>
  );
}
