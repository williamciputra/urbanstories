import type { ReactNode } from "react";

import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";

type StaticPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function StaticPageLayout({
  title,
  children,
}: StaticPageLayoutProps) {
  return (
    <>
      <Header />

      <main className="bg-[#FAF8F3]">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <div className="mt-12 space-y-8 text-[18px] leading-[2] text-neutral-700 lg:text-[19px] lg:leading-[1.95]">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}