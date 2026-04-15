import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <div className="space-y-1">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500"
          >
            {siteConfig.name}
          </Link>
          <p className="hidden text-sm text-slate-600 sm:block">
            {siteConfig.tagline}
          </p>
        </div>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-3 text-sm font-medium text-slate-600">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
