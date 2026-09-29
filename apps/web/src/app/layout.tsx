import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers";
import { Header } from "@/features/header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { NotificationHandler } from "@/components/shared/NotificationHandler";
import { AuthDiscovery } from "@/features/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strapi Blog",
  description: "This is a blog application built with Strapi, Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthDiscovery />
          <Header />
          <main>{children}</main>
          <Toaster richColors closeButton position="top-center" />
          <Suspense fallback={null}>
            <NotificationHandler />
          </Suspense>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
