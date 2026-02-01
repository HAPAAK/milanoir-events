"use client";

import FeatureCard from "@/components/cards/FeatureCard";
import { Music, Users, Zap, Calendar, Globe, Sparkles } from "lucide-react";
import styles from "@/styles/FeaturesSection.module.css";
import { useMessages } from "@/i18n/I18nProvider";

const FeaturesSection = () => {
  const messages = useMessages();
  const featureItems = [
    { icon: Music, title: messages.features.items.premiumEntertainment.title, description: messages.features.items.premiumEntertainment.description },
    { icon: Users, title: messages.features.items.exclusiveExperiences.title, description: messages.features.items.exclusiveExperiences.description },
    { icon: Zap, title: messages.features.items.cuttingEdgeProduction.title, description: messages.features.items.cuttingEdgeProduction.description },
    { icon: Calendar, title: messages.features.items.curatedEvents.title, description: messages.features.items.curatedEvents.description },
    { icon: Sparkles, title: messages.features.items.luxuryTouch.title, description: messages.features.items.luxuryTouch.description },
  ];

  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{messages.features.title}</span>
          </h2>
          <p className={styles.subtitle}>
            {messages.features.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          {featureItems.map((feature, index) => (
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
};

export default FeaturesSection;

