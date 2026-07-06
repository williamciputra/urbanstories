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

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanstories.id"),
  applicationName: "Urbanstories",

  title: {
    default: "Urbanstories | Cerita yang Menginspirasi",
    template: "%s | Urbanstories",
  },

  description:
    "Urbanstories menghadirkan cerita, ide, bisnis, teknologi, kesehatan, dan gaya hidup yang menginspirasi kehidupan urban.",

  keywords: [
    "Urbanstories",
    "Media Digital",
    "Berita",
    "Lifestyle",
    "Health",
    "Technology",
    "Business",
    "Indonesia",
  ],

  authors: [
    {
      name: "William Ciputra",
    },
  ],

  creator: "William Ciputra",

  publisher: "Urbanstories",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://urbanstories.id",
    siteName: "Urbanstories",
    title: "Urbanstories | Cerita yang Menginspirasi",
    description:
      "Urbanstories menghadirkan cerita, ide, bisnis, teknologi, kesehatan, dan gaya hidup yang menginspirasi kehidupan urban.",
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
      "Cerita yang Menginspirasi tentang bisnis, teknologi, kesehatan, dan gaya hidup.",
    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  referrer: "origin-when-cross-origin",

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  manifest: "/manifest.webmanifest",

  icons: {
    icon: "/favicon.ico",
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
      <body className="min-h-full flex flex-col">

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
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

    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
        </Script>

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