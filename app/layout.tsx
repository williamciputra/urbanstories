import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://urbanstories.id";
const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "Urbanstories",

  title: {
    default: "Urbanstories | Cerita yang Menginspirasi",
    template: "%s | Urbanstories",
  },

  description:
    "Urbanstories menghadirkan cerita, wawasan, dan inspirasi seputar gaya hidup, kesehatan, bisnis, teknologi, hingga berbagai isu yang relevan dengan kehidupan masyarakat urban.",

  authors: [
    {
      name: "Urbanstories",
    },
  ],

  creator: "Urbanstories",

  publisher: "Urbanstories",

  category: "news",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Urbanstories",
    title: "Urbanstories | Cerita yang Menginspirasi",
    description:
      "Urbanstories menghadirkan cerita, wawasan, dan inspirasi seputar gaya hidup, kesehatan, bisnis, teknologi, hingga berbagai isu yang relevan dengan kehidupan masyarakat urban.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Urbanstories",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Urbanstories | Cerita yang Menginspirasi",
    description:
      "Urbanstories menghadirkan cerita, wawasan, dan inspirasi seputar gaya hidup, kesehatan, bisnis, teknologi, hingga berbagai isu yang relevan dengan kehidupan masyarakat urban.",
    images: ["/opengraph-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  manifest: "/manifest.webmanifest",

  themeColor: "#F7F4EE",

  colorScheme: "light",

  appleWebApp: {
    capable: true,
    title: "Urbanstories",
    statusBarStyle: "default",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        <OrganizationSchema />

        <WebSiteSchema />

        <Toaster
          position="top-right"
          richColors
          closeButton
        />

        {children}
      </body>
    </html>
  );
}