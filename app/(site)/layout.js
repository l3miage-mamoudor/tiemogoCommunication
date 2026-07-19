import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButtons from "@/components/MagneticButtons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import IntroReveal from "@/components/IntroReveal";

export default function SiteLayout({ children }) {
  return (
    <div className="siteRoot">
      <IntroReveal />
      <ScrollProgress />
      <CustomCursor />
      <MagneticButtons />
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
