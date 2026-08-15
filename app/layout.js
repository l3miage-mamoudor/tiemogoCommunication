import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";

// Auto-hébergées via next/font : plus de requête bloquante vers Google Fonts,
// plus de flash de texte non stylé (FOUT).
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

// Remplace Pacifico (police "petit commerce") par un serif italique éditorial,
// utilisé uniquement sur les accents de marque (wordmark, verbes, citations).
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.tiemogocommaker.com";

const TITLE = "Tiemogo Communication — Observer. Comprendre. Révéler.";
const DESCRIPTION =
  "Comme le caméléon, nous devenons vous pour mieux vous révéler. Tiemogo Communication accompagne les entreprises qui veulent transformer la complexité en clarté : conseil stratégique, création, digital, édition et print, événementiel.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Tiemogo Communication",
  },
  description: DESCRIPTION,
  keywords: [
    "agence de communication",
    "conseil stratégique",
    "communication digitale",
    "relations presse",
    "événementiel",
    "édition et print",
  ],
  authors: [{ name: "Tiemogo Communication" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Tiemogo Communication",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tiemogo Communication",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.jpg`,
  description: DESCRIPTION,
  email: "contact@tiemogocommaker.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        {children}
      </body>
    </html>
  );
}
