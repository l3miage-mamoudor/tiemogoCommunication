import PageHeader from "@/components/PageHeader";
import Team from "@/components/Team";

export const metadata = {
  title: "L'agence",
  description:
    "Tiemogo Communication : une agence de communication qui prend le temps de comprendre votre activité, votre vision et vos objectifs avant de construire une stratégie sur mesure.",
  alternates: { canonical: "/agence" },
};

export default function AgencePage() {
  return (
    <>
      <PageHeader
        eyebrow="L'agence"
        title="Une communication pensée sur mesure, à l'image de vos besoins"
        lead="Nous prenons le temps de comprendre votre activité, votre vision et vos objectifs avant de construire une stratégie unique — parfaitement alignée avec votre identité."
      />
      <Team />
    </>
  );
}
