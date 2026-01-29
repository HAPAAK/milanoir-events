"use client";

import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import styles from "@/styles/ContactUsSection.module.css";
import { useMessages } from "@/i18n/I18nProvider";

const ContactUsSection = () => {
  const messages = useMessages();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const contactInfo = [
    {
      key: "email",
      icon: Mail,
      title: messages.contact.info.email.title,
      details: messages.contact.info.email.details,
      link: `mailto:${messages.contact.info.email.details}`,
    },
    {
      key: "phone",
      icon: Phone,
      title: messages.contact.info.phone.title,
      details: messages.contact.info.phone.details,
      link: `tel:${messages.contact.info.phone.details}`,
    },
    {
      key: "location",
      icon: MapPin,
      title: messages.contact.info.location.title,
      details: messages.contact.info.location.details,
      link: null,
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = messages.contact.validation.nameRequired;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = messages.contact.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = messages.contact.validation.emailInvalid;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: messages.contact.toast.copied.title,
      description: `${label} ${messages.contact.toast.copied.descriptionSuffix}`,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: messages.contact.toast.invalid.title,
        description: messages.contact.toast.invalid.description,
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
        throw new Error(data?.error ?? messages.contact.toast.submitErrorFallback);
      }

      setSubmitted(true);
      toast({
        title: messages.contact.toast.success.title,
        description: messages.contact.toast.success.description,
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      toast({
        title: messages.contact.toast.error.title,
        description: error instanceof Error ? error.message : messages.contact.toast.error.fallback,
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
            <span className={styles.titleGradient}>{messages.contact.title}</span>
          </h2>
          <p className={styles.subtitle}>
            {messages.contact.subtitle}
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
                  {messages.contact.labels.fullName} <span className={styles.labelRequired}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={messages.contact.placeholders.name}
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
                  {messages.contact.labels.email} <span className={styles.labelRequired}>*</span>
                </label>
                <input
                  type="email"
                  placeholder={messages.contact.placeholders.email}
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
                  {messages.contact.labels.message} <span className={styles.labelOptional}>{messages.contact.labels.optional}</span>
                </label>
                <textarea
                  placeholder={messages.contact.placeholders.message}
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
                  {submitted ? messages.contact.submit.sent : loading ? messages.contact.submit.loading : messages.contact.submit.cta}
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
                    key={info.key}
                    className={styles.contactCard}
                    onClick={() => {
                      if (info.link) {
                        window.location.href = info.link;
                      } else {
                        handleCopyToClipboard(info.details, info.title);
                      }
                    }}
                  >
                    <div className={styles.contactCardGradient} />

                    <div className={styles.contactCardContent}>
                      <div className={styles.iconBox}>
                        <Icon size={24} color="#a855f7" />
                      </div>
                      <div className={styles.contactInfo}>
                        <h4 className={styles.contactTitle}>{info.title}</h4>
                        <p className={styles.contactDetails}>
                          {info.details}
                        </p>
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
                allow="fullscreen" 
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
