"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import styles from "@/styles/WaitlistSection.module.css";
import { useMessages } from "@/i18n/I18nProvider";

const WaitlistSection = () => {
  const messages = useMessages();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const perks = messages.waitlist.perks;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = messages.waitlist.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = messages.waitlist.validation.emailInvalid;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: messages.waitlist.toast.invalid.title,
        description: messages.waitlist.toast.invalid.description,
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
        throw new Error(data?.error ?? messages.waitlist.toast.submitErrorFallback);
      }

      setSubmitted(true);
      toast({
        title: messages.waitlist.toast.success.title,
        description: messages.waitlist.toast.success.description,
      });
      setEmail("");
      setErrors({});
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      toast({
        title: messages.waitlist.toast.error.title,
        description: error instanceof Error ? error.message : messages.waitlist.toast.error.fallback,
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
            <span className={styles.titleGradient}>{messages.waitlist.title}</span>
          </h2>
          <p className={styles.subtitle}>
            {messages.waitlist.subtitle}
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
                  placeholder={messages.waitlist.emailPlaceholder}
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
                  {submitted ? messages.waitlist.submit.joined : loading ? messages.waitlist.submit.loading : messages.waitlist.submit.cta}
                </span>
                <ArrowRight className={styles.submitIcon} />
              </button>
            </div>
            <p className={styles.formInfo}>{messages.waitlist.formInfo}</p>
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

