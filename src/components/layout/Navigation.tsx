"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logoImage from "../../../public/milanoir-logo.png";
import styles from "@/styles/Navigation.module.css";
import { useMessages } from "@/i18n/I18nProvider";

const Navigation = () => {
  const messages = useMessages();
  const navLinks = [
    { label: messages.navigation.links.home, href: "#home" },
    { label: messages.navigation.links.artists, href: "#artists" },
    { label: messages.navigation.links.waitlist, href: "#waitlist" },
    { label: messages.navigation.links.contact, href: "#contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          {/* Desktop Navigation Links */}
          <div className={styles.navLinksDesktop}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className={styles.navLink}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Logo */}
          <a
            href="#home"
            className={styles.logo}
            onClick={(event) => {
              event.preventDefault();
              handleNavClick("#home");
            }}
          >
            <Image
              src={logoImage}
              alt={messages.navigation.logoAlt}
              height={logoImage.height}
              width={logoImage.width}
              priority
            />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={styles.mobileMenuButton}
            aria-label={messages.navigation.toggleMenuAria}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
          <div className={styles.mobileLinkContainer}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.href);
                }}
                className={styles.mobileLink}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;

