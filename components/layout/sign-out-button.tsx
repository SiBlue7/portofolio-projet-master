"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LoaderCircle, LogOut } from "lucide-react";

type SignOutButtonProps = {
  callbackUrl?: string;
};

export function SignOutButton({
  callbackUrl = "/login?reason=signed-out",
}: Readonly<SignOutButtonProps>) {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({
      callbackUrl,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isSigningOut ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}
      <span>{isSigningOut ? "Deconnexion..." : "Se deconnecter"}</span>
    </button>
  );
}
