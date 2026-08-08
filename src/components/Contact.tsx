import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/BrandIcons";
import { contact, profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
          {contact.headline}
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
          {contact.copy}
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 mt-8 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Mail size={16} />
          {profile.email}
        </a>

        <div className="mt-8 flex items-center justify-center gap-5 text-muted-foreground">
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
    </section>
  );
}
