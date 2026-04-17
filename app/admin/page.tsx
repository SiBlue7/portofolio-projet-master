import { Container } from "@/components/ui/container";

export default function AdminPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Admin Area
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">
          Admin dashboard placeholder
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          This route is intentionally lightweight for now. It reserves the
          private workspace for upcoming authentication, project management,
          runbook, and visibility-control tickets.
        </p>
      </div>
    </Container>
  );
}
