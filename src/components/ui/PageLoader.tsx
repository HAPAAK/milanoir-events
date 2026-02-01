"use client";

import { useEffect, useState } from "react";
import { useMessages } from "@/i18n/I18nProvider";

export default function PageLoader() {
  const messages = useMessages();
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1500); // 2 seconds

    // Remove loader after fade completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 2s display + 1.5s fade

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div
        className="w-fit font-bold text-transparent leading-[1.5] animate-wave wave-loader"
        data-text={messages.loader.text}
      ></div>

      {/* CSS for wave loader styling */}
      <style jsx>{`
        .wave-loader {
          font-family: var(--font-playfair), serif;
          font-size: clamp(3rem, 8vw, 6rem);
          -webkit-text-stroke: 2px hsl(var(--secondary));
          text-stroke: 2px hsl(var(--secondary));
          background:
            radial-gradient(1.13em at 50% 1.6em, hsl(var(--accent)) 99%, transparent 101%) calc(50% - 1.6em) 0/3.2em 100% text,
            radial-gradient(1.13em at 50% -0.8em, transparent 99%, hsl(var(--accent)) 101%) 50% .8em/3.2em 100% repeat-x text;
          -webkit-background-clip: text;
          background-clip: text;
        }

        .wave-loader:before {
          content: attr(data-text);
        }
      `}</style>
    </div>
  );
}