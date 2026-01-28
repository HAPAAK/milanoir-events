"use client";

import Image from "next/image";
import { useMessages } from "@/i18n/I18nProvider";
import styles from "@/styles/FeaturedArtistsSection.module.css";

const FeaturedArtistsSection = () => {
  const messages = useMessages();

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
          {/* Upcoming Artist - First in grid (left side) */}
          <div className={styles.artistCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={messages.artists.upcoming.image}
                alt={messages.artists.upcoming.title}
                fill
                className={`${styles.artistImage} ${styles.blurredImage}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className={styles.imageOverlay} />
              <div className={styles.upcomingTextOverlay}>
                <h3 className={styles.upcomingTitle}>{messages.artists.upcoming.title}</h3>
              </div>
            </div>
            <div className={styles.artistInfo}>
              <p className={styles.genre}>{messages.artists.upcoming.genre}</p>
              <p className={styles.bio}>{messages.artists.upcoming.bio}</p>
            </div>
          </div>

          {/* Featured Artists */}
          {messages.artists.featured.map((artist, index) => (
            <div key={artist.name} className={styles.artistCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className={styles.artistImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
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
