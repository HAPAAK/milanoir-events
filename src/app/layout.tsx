import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import { ToastProvider } from "@/hooks/use-toast";
import { I18nProvider } from "@/i18n/I18nProvider";
import messages from "@/messages/en.json";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: messages.metadata.title,
  description: messages.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <I18nProvider>
          <ToastProvider>
            <PageLoader />
            <div className="relative min-h-screen">
              <Navigation />
              <main className="relative z-10">{children}</main>
            </div>
            <Footer />
          </ToastProvider>
        </I18nProvider>
      </body>
    </html>
  );
}