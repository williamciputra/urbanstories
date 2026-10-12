import type { ReactNode } from "react";
import { V3Header, V3Footer } from "@/components/v3/shared/V3Chrome";

type V3StaticPageLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function V3StaticPageLayout({
  title,
  children,
}: V3StaticPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <V3Header />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-12 space-y-8 text-[18px] leading-[2] text-neutral-700 lg:text-[19px] lg:leading-[1.95]">
            {children}
          </div>
        </div>
      </main>
      <V3Footer />
    </div>
  );
}
