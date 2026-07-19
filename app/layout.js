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

export const metadata = {
  title: "Tiemogo Communication — Observer. Comprendre. Révéler.",
  description:
    "Comme le caméléon, nous devenons vous pour mieux vous révéler. Tiemogo Communication accompagne les entreprises qui veulent transformer la complexité en clarté : conseil stratégique, création, digital, édition et print, événementiel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
