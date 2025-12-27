"use client";

import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import styles from "@/styles/ContactUsSection.module.css";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "info@milanoir-events.com",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+41 7887772745",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "Island Business Centre, 202, SE18 6PF, London",
  },
];

const ContactUsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email,
          name: formData.name,
          message: formData.message,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? "Unable to submit the form right now.");
      }

      setSubmitted(true);
      toast({
        title: "Message sent! 🚀",
        description: "We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
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
    <section id="contact" className={styles.section}>
      <div className={styles.glow1} />
      <div className={styles.glow2} />
      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <span className={styles.titleGradient}>Let's Create Something Extraordinary</span>
          </h2>
          <p className={styles.subtitle}>
            Have a vision? Let's bring it to life together. Reach out to discuss your next big event.
          </p>
        </div>

        {/* Contact Form */}
        <div className={styles.grid}>
          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formBox}>
              {/* Name Field */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Full Name <span className={styles.labelRequired}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                  }}
                  className={`${styles.input} ${errors.name ? styles.error : ""}`}
                />
                {errors.name && <p className={styles.errorText}>{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Email Address <span className={styles.labelRequired}>*</span>
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  className={`${styles.input} ${errors.email ? styles.error : ""}`}
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}
              </div>

              {/* Message Field */}
              <div className={styles.fieldGroup}>
                <label className={styles.label}>
                  Message <span className={styles.labelOptional}>(Optional)</span>
                </label>
                <textarea
                  placeholder="Tell us about your vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || submitted}
                className={styles.submitButton}
              >
                <span>
                  {submitted ? "Message Sent!" : loading ? "Sending..." : "Send Message"}
                </span>
                <ArrowRight className={styles.submitIcon} />
              </button>

              {/* Form Info */}
              {/* <p className={styles.formInfo}>
                We'll respond within 24 hours
              </p> */}
            </div>
          </form>

          {/* Contact Info Section */}
          <div className={styles.contactSection}>
            <div className={styles.contactGrid}>
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className={styles.contactCard}
                    onClick={() => handleCopyToClipboard(info.details, info.title)}
                  >
                    <div className={styles.contactCardGradient} />
                    
                    <div className={styles.contactCardContent}>
                      <div className={styles.iconBox}>
                        <Icon size={24} color="#a855f7" />
                      </div>
                      <div className={styles.contactInfo}>
                        <h4 className={styles.contactTitle}>{info.title}</h4>
                        <p className={styles.contactDetails}>{info.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Google Map */}
            <div className={styles.mapContainer}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d9936.972674191655!2d0.06548!3d51.490405!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTHCsDI5JzI1LjUiTiAwwrAwMyc1NS43IkU!5e0!3m2!1sen!2sus!4v1766829843977!5m2!1sen!2sus" 
                width="600" 
                height="450" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
