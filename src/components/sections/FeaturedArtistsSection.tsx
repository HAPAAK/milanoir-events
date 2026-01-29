"use client";

import { useState } from "react";
import Image from "next/image";
import { useMessages } from "@/i18n/I18nProvider";
import styles from "@/styles/FeaturedArtistsSection.module.css";

const FeaturedArtistsSection = () => {
  const messages = useMessages();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (artistName: string) => {
    setImageErrors((prev) => ({ ...prev, [artistName]: true }));
  };

  return (
    <section id="artists" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>{messages.artists.title}</span>
          </h2>
          <p className={styles.subtitle}>{messages.artists.subtitle}</p>
        </div>

        <div className={styles.artistsGrid}>
          {/* Featured Artists */}
          {messages.artists.featured.map((artist, index) => (
            <div key={artist.name} className={styles.artistCard}>
              <div className={styles.imageWrapper}>
                {!imageErrors[artist.name] ? (
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className={styles.artistImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    onError={() => handleImageError(artist.name)}
                    quality={85}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>{artist.name}</span>
                  </div>
                )}
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.artistInfo}>
                <h3 className={styles.artistName}>{artist.name}</h3>
                <p className={styles.genre}>{artist.genre}</p>
                <p className={styles.bio}>{artist.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtistsSection;
