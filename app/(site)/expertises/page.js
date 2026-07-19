import PageHeader from "@/components/PageHeader";
import ExpertiseList from "@/components/ExpertiseList";

export const metadata = {
  title: "Expertises — Tiemogo Communication",
};

export default function ExpertisesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Expertises"
        title="Ce que nous faisons vraiment (bien)"
        lead="Cinq domaines d'intervention, pensés pour se compléter et construire un discours cohérent du premier au dernier point de contact."
        paper
      />
      <section className="section section--paper">
        <div className="container">
          <ExpertiseList />
        </div>
      </section>
    </>
  );
}
