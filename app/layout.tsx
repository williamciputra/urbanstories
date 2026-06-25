import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
        url: "/og-image.jpg",
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
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
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
        {children}
      </body>
    </html>
  );
}