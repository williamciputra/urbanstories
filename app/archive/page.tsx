import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";
import IndexFeed from "@/components/IndexFeed";

import { getIndexArticles } from "@/services/public/articles";

export const metadata: Metadata = {
  title: "Index | Urbanstories",
  description:
    "Telusuri seluruh artikel Urbanstories berdasarkan tanggal publikasi.",
};

export default async function IndexPage() {
  const articles = await getIndexArticles();

  return (
    <>
      <Header />

      <main className="bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link
              href="/"
              className="transition hover:text-neutral-900"
            >
              Home
            </Link>

            <span>/</span>

            <span className="font-medium text-neutral-900">
              Index
            </span>
          </nav>

          <div className="mt-10">
            <IndexFeed articles={articles} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}