import { ExternalLink } from "lucide-react";
import { personalProjects, freelanceProjects, type Project } from "../data/content";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden flex flex-col">
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="h-64 sm:h-72 w-full object-contain bg-background"
      />

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <h4 className="font-display text-xl font-semibold text-foreground">
          {project.name}
        </h4>
        <p className="text-muted-foreground mt-3 leading-relaxed text-sm flex-1">
          {project.description}
        </p>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          View
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  );
}

function ProjectColumn({ title, items }: { title: string; items: Project[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-6">
        {title}
      </h3>
      <div className="grid gap-8">
        {items.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-accent mb-3 text-center">Work</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-12 text-center">
          Featured projects
        </h2>

        <div className="grid lg:grid-cols-2 gap-x-12 gap-y-16">
          <ProjectColumn title="Personal Projects" items={personalProjects} />
          <ProjectColumn title="Freelance Work" items={freelanceProjects} />
        </div>
      </div>
    </section>
  );
}
