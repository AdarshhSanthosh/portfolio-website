import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {year} {profile.name}. Built with React &amp; Tailwind.
        </p>
        <p className="text-xs">
          Betta fish model &ldquo;Sculptural Betta Fish Figurine&rdquo; by Haggiwatt, via{" "}
          <a
            href="https://www.printables.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            Printables
          </a>
          , licensed{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            CC BY-NC-SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
