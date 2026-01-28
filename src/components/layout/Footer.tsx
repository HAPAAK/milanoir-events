"use client";

import { Instagram, Facebook, Twitter, Globe } from "lucide-react";
import { useI18n, useMessages } from "@/i18n/I18nProvider";

export default function Footer() {
  const messages = useMessages();
  const { locale, locales, setLocale } = useI18n();
  const sections = messages.footer.sections as Record<string, { title: string; links: Record<string, string> }>;
  const sectionOrder = messages.footer.sectionsOrder as string[];
  const footerLinks = sectionOrder
    .filter((key) => sections[key] && sections[key].links)
    .map((key) => {
      const section = sections[key];
      const links = (Object.entries(section.links) as [string, string][])
        .map(([linkKey, label]) => ({
          key: linkKey,
          label,
          href: linkKey === "contact" ? "#contact" : "#",
        }));
      return { key, title: section.title, links };
    });
  const socialLinks = [
    { label: messages.footer.social.instagram, icon: Instagram, href: "https://www.instagram.com/milanoirevents/#" },
    { label: messages.footer.social.facebook, icon: Facebook, href: "https://facebook.com/milanoirevents" },
    { label: messages.footer.social.twitter, icon: Twitter, href: "https://twitter.com/milanoirevents" },
  ];
  const hashtags = messages.footer.hashtags;
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      {/* Links Section */}
      <div className="border-t border-border/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.key}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {messages.footer.copyrightSuffix}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  {messages.footer.locale.label}
                </label>
                <select
                  className="rounded-full border border-border/60 bg-card/60 px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary"
                  value={locale}
                  onChange={(event) => setLocale(event.target.value as typeof locale)}
                  aria-label={messages.footer.locale.label}
                >
                  {locales.map((option) => (
                    <option key={option} value={option}>
                      {messages.footer.locale.options[option as keyof typeof messages.footer.locale.options] || option}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Hashtags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            {hashtags.map((tag) => (
              <span key={tag} className="hover:text-primary transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
