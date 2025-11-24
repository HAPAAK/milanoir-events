"use client";

import FeatureCard from "@/components/cards/FeatureCard";
import { Music, Users, Zap, Calendar, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Music,
    title: "Premium Entertainment",
    description:
      "World-class concerts and live performances featuring internationally acclaimed artists and emerging talents.",
  },
  {
    icon: Users,
    title: "Exclusive Experiences",
    description:
      "Intimate gatherings and large-scale festivals designed to create unforgettable memories for every guest.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Production",
    description:
      "State-of-the-art sound, lighting, and visual technology that transforms every event into a spectacle.",
  },
  {
    icon: Calendar,
    title: "Curated Events",
    description:
      "Carefully selected lineup of concerts, shows, and cultural experiences across multiple venues.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Bringing international acts to local stages and creating connections through the universal language of music.",
  },
  {
    icon: Sparkles,
    title: "Luxury Touch",
    description:
      "Every detail crafted with precision, ensuring premium hospitality from pre-show moments to encore finales.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="relative px-4 pt-16 pb-20 md:pt-20 md:pb-24">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-16 space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold animate-fade-in-up">
          <span className="text-cosmic-gradient">What Makes Us Unique</span>
        </h2>
        <p
          className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Every event is a masterpiece, crafted with passion, precision, and an unwavering commitment to excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;

