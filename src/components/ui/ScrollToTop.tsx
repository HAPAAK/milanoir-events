"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-28 right-8 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Button
        size="icon"
        onClick={scrollToTop}
        className="rounded-full h-14 w-14 bg-primary/80 backdrop-blur-sm hover:bg-primary transition-all duration-300 shadow-lg"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 text-primary-foreground" />
      </Button>
    </div>
  );
}
