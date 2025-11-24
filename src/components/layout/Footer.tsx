import { Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "#about" },
    // { label: "Our Story", href: "#story" },
    // { label: "Careers", href: "#careers" },
    // { label: "Press", href: "#press" },
  ],
  // events: [
  //   { label: "Upcoming Events", href: "#events" },
  //   { label: "Past Events", href: "#past-events" },
  //   { label: "Private Events", href: "#private" },
  //   { label: "Corporate Events", href: "#corporate" },
  // ],
  // support: [
  //   { label: "Contact Us", href: "#contact" },
  //   { label: "FAQs", href: "#faqs" },
  //   { label: "Ticket Support", href: "#support" },
  //   { label: "Venue Info", href: "#venues" },
  // ],
  // legal: [
  //   { label: "Privacy Policy", href: "#privacy" },
  //   { label: "Terms of Service", href: "#terms" },
  //   { label: "Cookie Policy", href: "#cookies" },
  // ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/milanoir", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/milanoir", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/milanoir", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/milanoir", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@milanoir", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      {/* Links Section */}
      <div className="border-t border-border/50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h3 className="font-semibold text-foreground uppercase text-sm tracking-wider">
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Milanoir Events. All rights reserved.
              </p>

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

          {/* Hashtags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">
              #MilanoirEvents
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              #TheBeginningOfInfinity
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              #LuxuryEvents
            </span>
            <span className="hover:text-primary transition-colors cursor-pointer">
              #GlobalStage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
