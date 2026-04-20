import Link from "next/link";
import { redirect } from "next/navigation";
import { LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { LoginForm } from "@/components/forms/login-form";
import { Container } from "@/components/ui/container";
import { authOptions } from "@/lib/auth/auth-options";

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    reason?: string;
  }>;
};

const securityHighlights = [
  {
    icon: ShieldCheck,
    title: "Connexion côté serveur",
    description:
      "Les identifiants sont validés via NextAuth et Prisma, sans logique sensible exposée au client.",
  },
  {
    icon: LockKeyhole,
    title: "Accès réservé à l’admin",
    description:
      "Cette entrée prépare la protection du dashboard privé et la gestion centralisée des projets.",
  },
  {
    icon: Sparkles,
    title: "Base prête pour évoluer",
    description:
      "Le formulaire garde une structure simple, lisible et réutilisable pour les prochains tickets auth.",
  },
];

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    redirect("/admin");
  }

  const { callbackUrl, reason } = await searchParams;
  const safeCallbackUrl =
    callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/admin";
  const initialMessage =
    reason === "unauthorized"
      ? "Connecte-toi pour accéder à l’espace d’administration."
      : undefined;

  return (
    <div className="min-h-screen">
      <Container className="flex min-h-screen items-center py-10 sm:py-14">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <section className="space-y-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-sky-200 hover:text-sky-700"
            >
              Portfolio Projet Master
            </Link>

            <div className="space-y-5">
              <p className="text-sm font-semibold tracking-[0.26em] text-slate-500 uppercase">
                Espace privé
              </p>
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Une connexion admin claire, moderne et prête pour la suite.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Cette page sert de porte d’entrée à l’administration du
                portfolio, avec une expérience sobre, responsive et cohérente
                avec le socle visuel déjà en place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {securityHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[1.75rem] border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur"
                  >
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                      <Icon className="size-5" />
                    </span>
                    <h2 className="mt-4 text-base font-semibold text-slate-950">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          <section>
            <LoginForm
              callbackUrl={safeCallbackUrl}
              initialMessage={initialMessage}
            />
          </section>
        </div>
      </Container>
    </div>
  );
}
