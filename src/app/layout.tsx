import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/ui/PageLoader";
import { ToastProvider } from "@/hooks/use-toast";

export const metadata: Metadata = {
  title: "Milanoir Events",
  description: "Luxury concert and live experience designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ToastProvider>
          <PageLoader />
          <div className="relative min-h-screen">
            <Navigation />
            <main className="relative z-10">{children}</main>
          </div>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}