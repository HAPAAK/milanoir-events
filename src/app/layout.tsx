import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import { ToastProvider } from "@/hooks/use-toast";
import { I18nProvider } from "@/i18n/I18nProvider";
import messages from "@/messages/en.json";

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
    <html lang="en">
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