"use client";

import { ArrowRight } from "lucide-react";
import styles from "@/styles/HeroSection.module.css";
import { useMessages } from "@/i18n/I18nProvider";

const HeroSection = () => {
  const messages = useMessages();
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Background with animation */}
      <div className={styles.background}>
        <div className={styles.overlay} />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{messages.hero.title}</span>
          </h2>
          <p className={styles.subtitle}>
            {messages.hero.subtitle}
          </p>
          <div className={styles.buttonContainer}>
            <button
              onClick={scrollToWaitlist}
              className={styles.button}
            >
              {messages.hero.cta}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

