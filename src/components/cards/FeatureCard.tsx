"use client";

import { LucideIcon } from "lucide-react";
import { useState } from "react";
import styles from "@/styles/FeatureCard.module.css";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={styles.cardContainer}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`${styles.cardFlip} ${isFlipped ? styles.flipped : ""}`}>
        {/* Front */}
        <div className={`${styles.cardFace} ${styles.cardFront} ${styles.animation}`}>
          <div className={styles.iconContainer}>
            <Icon className={styles.icon} />
          </div>
          <h3 className={styles.title}>{title}</h3>
        </div>

        {/* Back */}
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div className={styles.iconContainerBack}>
            <Icon className={styles.iconBack} />
          </div>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;


