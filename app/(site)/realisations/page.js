import PageHeader from "@/components/PageHeader";
import Portfolio from "@/components/Portfolio";

export const metadata = {
  title: "Réalisations",
  description:
    "Une sélection de projets menés par Tiemogo Communication : stratégie, création et communication pensées pour durer.",
  alternates: { canonical: "/realisations" },
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
