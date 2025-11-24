"use client";

import { useState } from "react";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const perks = [
  "Priority ticket access and private invites",
  "Behind-the-scenes content drops",
  "Exclusive partner offers and experiences",
];

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to join the waitlist right now.");
      }

      toast({
        title: "Welcome to the waitlist! 🚀",
        description: "You'll be among the first to know when we launch.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Please try again in a moment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative px-4 pt-16 pb-24 md:pt-20 md:pb-32">
      <div className="pointer-events-none absolute -z-[1] top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/25 via-accent/25 to-primary/10 blur-[160px]" />
      <div className="pointer-events-none absolute -z-[1] top-24 right-12 h-64 w-64 bg-accent/15 blur-[120px] rounded-full" />
      <div className="max-w-5xl mx-auto text-center space-y-12 relative">
        <div className="space-y-6 animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="text-cosmic-gradient">Ready to experience the magic?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join our waitlist for the inaugural season. Be the first to secure tickets, unlock VIP experiences,
            and receive curated stories from backstage.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto animate-fade-in-up">
          <div className="relative group rounded-2xl bg-card/60 border border-border/40 shadow-[0_25px_60px_rgba(15,15,30,0.45)] p-6 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_auto] gap-4">
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-[68px] pl-14 text-lg bg-transparent border border-white/10 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-[68px] px-10 text-lg font-semibold hover:opacity-95 transition-all duration-300 group/btn"
              >
                <span className="flex items-center gap-2">
                  {loading ? "Joining..." : "Join Waitlist"}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </div>
          </div>
          {/* <p className="text-xs text-muted-foreground text-center mt-4">
            Join over <span className="text-primary font-semibold">1,000+</span> people waiting for exclusive early access
          </p> */}
        </form>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          {perks.map((perk) => (
            <div key={perk} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;

