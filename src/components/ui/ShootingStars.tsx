"use client";

import { useEffect, useRef } from "react";
import styles from "@/styles/ShootingStars.module.css";

interface ShootingStarsProps {
  starCount?: number;
}

export const ShootingStars = ({ starCount = 20 }: ShootingStarsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Create shooting stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = styles.shooting_star;
      
      // Random delay for staggered animation
      const delay = Math.random() * 9999;
      star.style.setProperty("--delay", `${delay}ms`);
      
      container.appendChild(star);
    }

    return () => {
      container.innerHTML = "";
    };
  }, [starCount]);

  return <div ref={containerRef} className={styles.night} />;
};
