import { Check } from "lucide-react";
import { skillCategories } from "../data/content";

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-accent mb-3 text-center">Skills</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-12 text-center">
          Technical Skills
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col"
            >
              <h3 className="font-display text-base font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <ul className="space-y-2.5">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-muted-foreground leading-snug"
                  >
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
