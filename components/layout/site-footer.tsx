import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white/70">
      <Container className="flex flex-col gap-2 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {siteConfig.name} • {year}
        </p>
        <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}
