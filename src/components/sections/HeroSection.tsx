"use client";

import { ArrowRight } from "lucide-react";
import { ShootingStars } from "@/components/ui/ShootingStars";
import styles from "@/styles/HeroSection.module.css";

const HeroSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={styles.hero}>
      {/* Background with animation */}
      <div className={styles.background}>
        <ShootingStars starCount={20} />
        <div className={styles.overlay} />
      </div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            <span style={{ background: "linear-gradient(to right, #a855f7, #ec4899)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Milanoir Events
            </span>
          </h1>
          <p className={styles.subtitle}>
            Premier Event Production for Artists and Performers
          </p>
          <div className={styles.buttonContainer}>
            <button
              onClick={scrollToWaitlist}
              className={styles.button}
            >
              Join the Waitlist
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

