"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// const heroStats = [
//   { label: "Cities", value: "25+" },
//   { label: "Artists Hosted", value: "120+" },
//   { label: "Live Attendees", value: "500K+" },
//   { label: "Years of Craft", value: "10" },
// ];

const HeroSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden text-white pt-16 md:pt-20"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/placeholder.jpg"
          className="w-full h-full object-cover"
        >
          <source
            src="/hero-video.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse z-[1]" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow-pulse z-[1]"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-6rem)] px-4 text-center">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 -mt-10 md:-mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-in-up">
            <span className="uppercase text-cosmic-gradient glow-cosmic">Milanoir Events</span>
          </h1>
          <p className="uppercase tracking-[0.4em] text-lg md:text-xl text-primary">
            Premier Event Production for Artists and Performers
          </p>
          <div className="pt-5 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              onClick={scrollToWaitlist}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="pt-5 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-50 animate-glow-pulse" />
              <p className="relative text-xl md:text-2xl font-bold uppercase tracking-wider text-cosmic-gradient glow-cosmic px-6 py-2 border border-primary/30 rounded-lg bg-card/30 backdrop-blur-sm">
                Launching Soon
              </p>
            </div>
          </div>

          {/* <p
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground/70 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            Follow the story. The stage is being set.
          </p> */}

          {/* Stats */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left text-white/80 mt-10">
            {heroStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm tracking-wide uppercase text-white/70">{stat.label}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2 backdrop-blur-md bg-white/10">
          <div className="w-1.5 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

