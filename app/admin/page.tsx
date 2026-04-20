import { redirect } from "next/navigation";
import { FolderKanban, LineChart, ShieldCheck } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { SignOutButton } from "@/components/layout/sign-out-button";
import { Container } from "@/components/ui/container";
import { authOptions } from "@/lib/auth/auth-options";

const adminHighlights = [
  {
    title: "Pilotage centralise",
    description:
      "Prepare la gestion des projets, des statuts, de la visibilite publique et des futurs runbooks.",
    icon: FolderKanban,
  },
  {
    title: "Statistiques a venir",
    description:
      "Cette zone servira de base pour les indicateurs sur les commits, les technos et l'activite globale.",
    icon: LineChart,
  },
  {
    title: "Zone protegee",
    description:
      "La session authentifiee est deja prise en compte pour empecher l'acces direct sans connexion.",
    icon: ShieldCheck,
  },
];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?reason=unauthorized&callbackUrl=/admin");
  }

  return (
    <Container className="py-16 sm:py-20">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Admin Area
        </p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
              Tableau de bord administrateur
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Connexion active pour{" "}
              <span className="font-semibold text-slate-900">
                {session.user.email}
              </span>
              . Cette page reste volontairement legere, mais l&apos;acces est deja
              conditionne a une session valide.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              Session admin valide
            </div>
            <SignOutButton />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {adminHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
