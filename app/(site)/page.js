import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import ClientLogos from "@/components/ClientLogos";
import Manifesto from "@/components/Manifesto";
import ChameleonReveal from "@/components/ChameleonReveal";
import SectionReveal from "@/components/SectionReveal";
import Values from "@/components/Values";

export default function Home() {
  return (
    <>
      <Hero />
      <ChameleonReveal />
      <SectionReveal>
        <ClientLogos />
      </SectionReveal>
      <SectionReveal>
        <Manifesto />
      </SectionReveal>
      <SectionReveal>
        <Values />
      </SectionReveal>
      <SectionReveal>
        <Stats />
      </SectionReveal>
      <Services limit={3} showLink />
      <Marquee />
      <SectionReveal>
        <Portfolio limit={4} showLink />
      </SectionReveal>
      <SectionReveal>
        <Testimonials />
      </SectionReveal>
    </>
  );
}
