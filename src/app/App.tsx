import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { BrandTicker } from "./components/BrandTicker";
import { WorkflowSection } from "./components/WorkflowSection";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { GallerySection } from "./components/GallerySection";
import { ManifestoSection } from "./components/ManifestoSection";
import { BentoGrid } from "./components/BentoGrid";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WaitlistSection } from "./components/WaitlistSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0908" }}>
      <Navbar />
      <HeroSection />
      <BrandTicker />
      <WorkflowSection />
      <BeforeAfterSlider />
      <GallerySection />
      <ManifestoSection />
      <BentoGrid />
      <TestimonialsSection />
      <WaitlistSection />
      <CTASection />
      <Footer />
    </div>
  );
}
