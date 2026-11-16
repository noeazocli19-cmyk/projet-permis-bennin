import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/provider";
import { COMPANY } from "@/lib/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://projetpermisenin.bj"),
  title: {
    default: "PROJET PERMIS BÉNIN — Auto-école premium au Bénin",
    template: "%s | PROJET PERMIS BÉNIN",
  },
  description:
    "Apprenez à conduire avec PROJET PERMIS BÉNIN. Formations A1 à D, cours en ligne, accompagnement professionnel. La route vers votre liberté commence ici.",
  keywords: [
    "permis de conduire Bénin",
    "auto-école Bénin",
    "permis A1 A2 A3 B C C1 D",
    "formation conduite Cotonou",
    "PROJET PERMIS BÉNIN",
    "cours code de la route Bénin",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  applicationName: COMPANY.name,
  icons: {
    icon: [
      { url: "/logo/logo-projet-permis-benin.png", type: "image/png" },
    ],
    apple: "/logo/logo-projet-permis-benin.png",
  },
  openGraph: {
    title: "PROJET PERMIS BÉNIN — Auto-école premium au Bénin",
    description:
      "Formations A1 à D, cours en ligne, accompagnement professionnel. La route vers votre liberté commence ici.",
    siteName: COMPANY.name,
    locale: "fr_BJ",
    type: "website",
    images: [
      {
        url: "/images/hero-car.png",
        width: 1344,
        height: 768,
        alt: "Voiture blanche moderne sur la route",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PROJET PERMIS BÉNIN",
    description: "Auto-école premium au Bénin. La route vers votre liberté commence ici.",
    images: ["/images/hero-car.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: COMPANY.name,
    description:
      "Auto-école premium au Bénin. Formations aux permis A1 à D, cours en ligne et accompagnement professionnel.",
    slogan: COMPANY.slogan,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BJ",
    },
    telephone: COMPANY.phones,
    areaServed: COMPANY.localities.map((c) => ({ "@type": "City", name: c })),
    knowsLanguage: ["fr", "fon"],
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sora.variable} flex min-h-screen flex-col antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <Navbar />
          <main className="flex-1 pt-16 sm:pt-20">{children}</main>
          <Footer />
          <Toaster />
          <Sonner />
        </I18nProvider>
      </body>
    </html>
  );
}
