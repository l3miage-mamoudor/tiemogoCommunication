import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import MagneticButtons from "@/components/MagneticButtons";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="siteRoot">
      <ScrollProgress />
      <CustomCursor />
      <MagneticButtons />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
