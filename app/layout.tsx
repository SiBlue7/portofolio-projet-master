import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import "@/styles/globals.css";

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
