import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css";

// 1. Configure optimized, editorial typography tokens
const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// 2. High-fidelity metadata structures for platform crawling
export const metadata: Metadata = {
  title: "RentEase — Premium Furniture & Appliance Leasing Marketplace",
  description: "Access high-end household assets with flexible, custom tenures, seamless delivery frameworks, and zero security deposit constraints.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a", // Match slate-900 baseline theme configuration
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // Restrict accidental viewport zooming over dense inputs
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${sansFont.variable} ${monoFont.variable} antialiased scroll-smooth selection:bg-blue-600/10 selection:text-blue-700`}
    >
      <body className="bg-white font-sans text-slate-900 min-h-screen flex flex-col antialiased dynamic-subpixel-rendering">
        <QueryProvider>
          {/* Main Context Yield Panel */}
          <main className="flex-grow flex flex-col relative z-10">
            {children}
          </main>
          
          {/* Refined Toast Notification Layer */}
          <Toaster 
            richColors 
            closeButton
            position="top-right" 
            toastOptions={{
              style: {
                borderRadius: "14px",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02)",
                border: "1px solid rgba(241, 245, 249, 0.9)",
              },
              className: "text-[13px] font-medium tracking-tight",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}