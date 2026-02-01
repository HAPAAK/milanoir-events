"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import styles from "@/styles/HeroSection.module.css";
import { useMessages } from "@/i18n/I18nProvider";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const messages = useMessages();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const artistImages = ["/mr_d.jpeg", "/sacar.jpeg"];

  // const toggleAudio = () => {
  //   if (audioRef.current) {
  //     if (isMuted) {
  //       audioRef.current.play().catch((e) => console.log("Audio play failed:", e));
  //       audioRef.current.muted = false;
  //     } else {
  //       audioRef.current.pause();
  //       audioRef.current.muted = true;
  //     }
  //     setIsMuted(!isMuted);
  //   }
  // };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/audio/background-loop.mp3"); // Placeholder path
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Image Rotation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % artistImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [artistImages.length]);

  return (
    <section id="home" className={styles.hero}>
      {/* Background Image */}
      <div className={styles.background}>
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        {/* Left Column: Action */}
        <div className={styles.leftColumn}>
          <div className={styles.contentWrapper}>
            <div className={styles.tourLabel}>
              <span className={styles.tourLocation}>{messages.hero.tourLocation}</span>
              <span className={styles.tourDate}>{messages.hero.tourDate}</span>
            </div>
            <h1 className={styles.title}>
              <span className={styles.titleGradient}>{messages.hero.title}</span>
            </h1>
            <p className={styles.subtitle}>
              {messages.hero.subtitle}
            </p>
            
            <div className={styles.ctaWrapper}>
              <button 
                onClick={scrollToWaitlist}
                className={styles.glowButton}
              >
                {messages.hero.cta}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Atmosphere (Rotating Artist Card) */}
        <div className={styles.rightColumn}>
          <div className={styles.rotatingCard}>
            {artistImages.map((src, index) => (
              <div
                key={src}
                className={`${styles.artistImageWrapper} ${
                  index === currentImageIndex ? styles.active : ""
                }`}
              >
                <Image
                  src={src}
                  alt="Featured Artist"
                  fill
                  className={styles.artistImage}
                  priority
                />
              </div>
            ))}
            
            {/* Floating Elements (Decorative) */}
            <div className={styles.floatingIcon} style={{ top: '10%', right: '10%' }}>
              <span style={{ fontSize: '2rem' }}>🎵</span>
            </div>
            <div className={styles.floatingIcon} style={{ bottom: '15%', left: '5%' }}>
              <span style={{ fontSize: '2rem' }}>🥁</span>
            </div>
          </div>

          {/* Audio Toggle */}
          {/* <button 
            className={styles.audioToggle}
            onClick={toggleAudio}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
