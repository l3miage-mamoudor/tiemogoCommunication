import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact",
  description:
    "Décrivez votre besoin à Tiemogo Communication : nous revenons vers vous rapidement avec les prochaines étapes de votre projet de communication.",
  alternates: { canonical: "/contact" },
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
