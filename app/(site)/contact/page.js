import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact — Tiemogo Communication",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        lead="Décrivez-nous votre besoin, nous revenons vers vous rapidement avec les prochaines étapes."
      />
      <Contact />
    </>
  );
}
