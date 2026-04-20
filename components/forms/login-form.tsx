"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { AlertCircle, ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/auth/login-schema";
import { cn } from "@/lib/utils";

type LoginFormProps = {
  callbackUrl: string;
  initialMessage?: string;
};

type LoginFormState = LoginInput;

export function LoginForm({
  callbackUrl,
  initialMessage,
}: Readonly<LoginFormProps>) {
  const router = useRouter();
  const [isRedirecting, startRedirectTransition] = useTransition();
  const [feedbackMessage, setFeedbackMessage] = useState(initialMessage ?? "");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormState>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isBusy = isSubmitting || isRedirecting;
  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return "Connexion en cours...";
    }

    if (isRedirecting) {
      return "Redirection...";
    }

    return "Se connecter";
  }, [isRedirecting, isSubmitting]);

  const onSubmit = handleSubmit(async (values) => {
    setFeedbackMessage("");
    clearErrors();

    const parsedValues = loginSchema.safeParse(values);

    if (!parsedValues.success) {
      const fieldErrors = parsedValues.error.flatten().fieldErrors;

      if (fieldErrors.email?.[0]) {
        setError("email", {
          type: "manual",
          message: fieldErrors.email[0],
        });
      }

      if (fieldErrors.password?.[0]) {
        setError("password", {
          type: "manual",
          message: fieldErrors.password[0],
        });
      }

      return;
    }

    const result = await signIn("credentials", {
      email: parsedValues.data.email,
      password: parsedValues.data.password,
      callbackUrl,
      redirect: false,
    });

    if (!result?.ok || !result.url) {
      setFeedbackMessage("Identifiants invalides. Vérifie votre email et votre mot de passe.");
      return;
    }

    startRedirectTransition(() => {
      router.push(result.url ?? callbackUrl);
      router.refresh();
    });
  });

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
          <ShieldCheck className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold tracking-[0.24em] text-slate-500 uppercase">
            Admin Login
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
            Connexion administrateur
          </h1>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">
        Accédez à votre espace privé pour gérer les projets, la visibilité du
        portfolio et les futures données GitHub.
      </p>

      {feedbackMessage ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{feedbackMessage}</p>
        </div>
      ) : null}

      <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">
            Adresse email
          </span>
          <input
            type="email"
            autoComplete="email"
            placeholder="admin@portfolio.dev"
            className={cn(
              "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100",
              errors.email ? "border-rose-300" : "border-slate-200",
            )}
            {...register("email")}
          />
          {errors.email?.message ? (
            <p className="text-sm text-rose-600">{errors.email.message}</p>
          ) : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-800">
            Mot de passe
          </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Votre mot de passe"
            className={cn(
              "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100",
              errors.password ? "border-rose-300" : "border-slate-200",
            )}
            {...register("password")}
          />
          {errors.password?.message ? (
            <p className="text-sm text-rose-600">{errors.password.message}</p>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isBusy ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          <span>{submitLabel}</span>
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Authentification par email et mot de passe chiffré côté serveur.</p>
        <Link
          href="/"
          className="font-medium text-slate-950 transition hover:text-sky-700"
        >
          Retour au portfolio
        </Link>
      </div>
    </div>
  );
}
