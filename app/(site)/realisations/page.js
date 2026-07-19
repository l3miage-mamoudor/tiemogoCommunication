import PageHeader from "@/components/PageHeader";
import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Réalisations — Tiemogo Communication",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title="Une sélection de projets, pensés pour durer"
      />
      <Portfolio />
    </>
  );
}
