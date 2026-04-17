import { Container } from "@/components/ui/container";

export default function LoginPage() {
  return (
    <Container className="flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
          Authentication
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950">Login</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          This page reserves the future authentication entry point without
          introducing auth logic yet.
        </p>
      </div>
    </Container>
  );
}
