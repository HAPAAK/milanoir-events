"use client";

import FeatureCard from "@/components/cards/FeatureCard";
import { Music, Users, Zap, Calendar, Globe, Sparkles } from "lucide-react";
import styles from "@/styles/FeaturesSection.module.css";

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
  <section id="features" className={styles.section}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleGradient}>What Makes Us Unique</span>
        </h2>
        <p className={styles.subtitle}>
          Every event is a masterpiece, crafted with passion, precision, and an unwavering commitment to excellence.
        </p>
      </div>

      <div className={styles.grid}>
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

