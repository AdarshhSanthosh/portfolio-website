import { GraduationCap } from "lucide-react";
import { education } from "../data/content";

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-accent mb-3 text-center">Education</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-12 text-center">
          Academic background
        </h2>

        <div className="max-w-2xl mx-auto space-y-6">
          {education.map((item) => (
            <div
              key={item.degree}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-6"
            >
              <div className="rounded-lg bg-secondary p-3 text-accent shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">
                  {item.period}
                </p>
                <h3 className="font-display font-semibold text-foreground">
                  {item.degree}
                </h3>
                <p className="text-muted-foreground mt-1">{item.school}</p>
                <p className="text-sm text-muted-foreground">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
