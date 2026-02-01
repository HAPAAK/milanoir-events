"use client";

import { useMessages } from "@/i18n/I18nProvider";

const AboutSection = () => {
  const messages = useMessages();
  return (
    <section id="about" className="relative px-4 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-6 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-cosmic-gradient">{messages.about.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {messages.about.body}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

