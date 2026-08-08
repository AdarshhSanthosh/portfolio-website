import { Briefcase } from "lucide-react";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-accent mb-3 text-center">Experience</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-12 text-center">
          Where I've worked
        </h2>

        <div className="max-w-3xl mx-auto relative border-l border-border pl-8 space-y-10">
          {experience.map((job) => (
            <div key={job.company} className="relative">
              <span className="absolute -left-[2.55rem] top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-2">
                  <span>{job.period}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Briefcase size={16} className="text-accent" />
                  {job.role}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {job.company} · {job.location}
                </p>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {job.description}
                </p>
                <ul className="mt-3 space-y-1.5 list-disc list-inside text-sm text-muted-foreground">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
