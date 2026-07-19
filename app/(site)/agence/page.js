import PageHeader from "@/components/PageHeader";
import Team from "@/components/Team";

export const metadata = {
  title: "L'agence — Tiemogo Communication",
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
