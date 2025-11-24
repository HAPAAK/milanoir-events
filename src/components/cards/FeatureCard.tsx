"use client";

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

      <div className="relative p-8">
        <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>

        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-cosmic-gradient transition-colors duration-300">
          {title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export default FeatureCard;

