import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import IndexFeed from "../../components/IndexFeed";
import { articles } from "../../data/articles";

export const metadata: Metadata = {
  title: "Index | Urbanstories",
  description:
    "Telusuri seluruh artikel Urbanstories berdasarkan tanggal publikasi.",
};

export default function IndexPage() {
  return (
    <>
      <Header activeCategory="Index" />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-20">

          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link
              href="/"
              className="transition hover:text-black"
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