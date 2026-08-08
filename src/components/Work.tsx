import { projects } from "../data/content";
import shopifyImg from "../assets/project-shopify.webp";
import chatbotImg from "../assets/project-chatbot.webp";

const images = {
  shopify: shopifyImg,
  chatbot: chatbotImg,
};

export default function Work() {
  return (
    <section id="work" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-mono text-accent mb-3 text-center">Work</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-12 text-center">
          Featured projects
        </h2>

        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
            >
              <img
                src={images[project.image as keyof typeof images]}
                alt={project.name}
                className="h-64 sm:h-72 w-full object-contain bg-background"
              />

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-2">
                  {project.name}
                </h3>
                <p className="text-muted-foreground mt-3 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
