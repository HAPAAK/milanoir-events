import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import VisionSection from "@/components/sections/VisionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import FeaturedArtistsSection from "@/components/sections/FeaturedArtistsSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import ContactUsSection from "@/components/sections/ContactUsSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <FeaturedArtistsSection />
      <AboutSection />
      <WaitlistSection />
      <VisionSection />
      <FeaturesSection />
      <ContactUsSection />
    </div>
  );
}
