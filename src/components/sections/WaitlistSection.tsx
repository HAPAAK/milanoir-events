"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import styles from "@/styles/WaitlistSection.module.css";

const perks = [
  "Priority ticket access and private invites",
  "Behind-the-scenes content drops",
  "Exclusive partner offers and experiences",
];

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please check your input",
        description: "There are errors in the form",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to submit the form right now.");
      }

      setSubmitted(true);
      toast({
        title: "Message sent! 🚀",
        description: "You will be the first to know about upcoming events.",
      });
      setEmail("");
      setErrors({});
      
      setTimeout(() => setSubmitted(false), 3000);
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
    <section id="waitlist" className={styles.section}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Ready to experience the magic?</span>
          </h2>
          <p className={styles.subtitle}>
            Join our waitlist for the inaugural season. Be the first to secure tickets, unlock VIP experiences, and receive curated stories from backstage.
          </p>
        </div>

        {/* Email Signup Section */}
        <div className={styles.signupWrapper}>
          <form onSubmit={handleSubmit} className={styles.emailForm}>
            <div className={styles.formContent}>
              {/* Email Field */}
              <div className={styles.fieldGroup}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`${styles.emailInput} ${errors.email ? styles.error : ""}`}
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || submitted}
                className={styles.submitBtn}
              >
                <span>
                  {submitted ? "✓ Joined!" : loading ? "Joining..." : "Join Now"}
                </span>
                <ArrowRight className={styles.submitIcon} />
              </button>
            </div>
            <p className={styles.formInfo}>We'll only email you about upcoming events and special offers.</p>
          </form>
        </div>

        {/* Perks */}
        <div className={styles.perksContainer}>
          {perks.map((perk) => (
            <div key={perk} className={styles.perkItem}>
              <CheckCircle2 className={styles.perkIcon} />
              <span>{perk}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;

