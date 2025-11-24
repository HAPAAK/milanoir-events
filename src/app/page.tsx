import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import VisionSection from "@/components/sections/VisionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import WaitlistSection from "@/components/sections/WaitlistSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <FeaturesSection />
      <WaitlistSection />
    </div>
  );
}
