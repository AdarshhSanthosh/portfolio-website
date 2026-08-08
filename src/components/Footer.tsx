import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {year} {profile.name}. Built with React &amp; Tailwind.
        </p>
      </div>
    </footer>
  );
}
