import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const highlights = [
  {
    title: "Public portfolio",
    description:
      "Showcase curated projects, technical skills, and recruiter-facing information in a focused experience.",
  },
  {
    title: "Private admin dashboard",
    description:
      "Manage project content, visibility, media, runbooks, and future GitHub synchronization from one place.",
  },
  {
    title: "Ready for growth",
    description:
      "The initial structure leaves room for authentication, Prisma, analytics, and deployment workflows without rework.",
  },
];

const foundations = [
  "App Router with dedicated public and admin areas",
  "Tailwind CSS v4 wired through global styles and PostCSS",
  "Reusable UI primitives in components for future screens",
  "Dedicated lib, hooks, and types folders for shared concerns",
];

export default function HomePage() {
  return (
    <Container className="py-16 sm:py-20">
      <section className="grid gap-12 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-1 text-sm font-medium text-slate-700 shadow-sm">
            Portfolio Projet Master
          </div>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A clean Next.js foundation for your public portfolio and private
              project cockpit.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              This starter keeps the codebase light while preparing the
              structure you&apos;ll need for future authentication, database
              access, admin flows, and recruiter-facing pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="rounded-full bg-slate-900 px-4 py-2 font-medium text-white">
              Next.js 16 App Router
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium">
              Public route group
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-4 py-2 font-medium">
              Admin-ready structure
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <SectionHeading
            eyebrow="Initial scope"
            title="What this structure already gives you"
            description="A stable baseline with just enough separation to support the next tickets."
          />
          <ul className="mt-6 space-y-4">
            {foundations.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-slate-700"
              >
                <span className="mt-1 size-2 rounded-full bg-sky-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <SectionHeading
          eyebrow="Architecture"
          title="Prepared for public pages, admin pages, and API routes"
          description="Each folder now has a clearer responsibility so upcoming auth, Prisma, forms, and project modules can land in the right place."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
            >
              <h2 className="text-xl font-semibold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
