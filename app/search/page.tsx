import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";
import ArticleCard from "@/components/ArticleCard";

import {
  getHomepageSource,
  type HomepageArticle,
} from "@/services/public/articles";

export const metadata: Metadata = {
  title: "Pencarian | Urbanstories",
  description:
    "Temukan artikel yang Anda cari di Urbanstories.",
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q = "" } = await searchParams;

  const keyword = q.trim().toLowerCase();

  let results: HomepageArticle[] = [];

  if (keyword) {
    const articles = await getHomepageSource();

    results = articles.filter((article) => {
      const title = article.title.toLowerCase();
      const excerpt = article.excerpt.toLowerCase();
      const content = article.content.toLowerCase();

      return (
        title.includes(keyword) ||
        excerpt.includes(keyword) ||
        content.includes(keyword)
      );
    });
  }

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
              Pencarian
            </span>
          </nav>

          <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
            Hasil Pencarian
          </h1>

          <p className="mt-5 text-lg text-neutral-600">
            {keyword ? (
              <>
                Menampilkan hasil untuk{" "}
                <span className="font-semibold text-neutral-900">
                  {q}
                </span>
              </>
            ) : (
              "Masukkan kata kunci untuk mencari artikel."
            )}
          </p>

          <div className="mt-10 border-b border-neutral-200" />

          {keyword && results.length > 0 && (
            <>
              <p className="mt-10 text-neutral-500">
                {results.length} artikel ditemukan
              </p>

              <section className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {results.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                  />
                ))}
              </section>
            </>
          )}

          {keyword && results.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-bold text-neutral-900">
                Tidak ada artikel ditemukan
              </h2>

              <p className="mt-4 text-neutral-600">
                Coba gunakan kata kunci lain.
              </p>
            </div>
          )}

          {!keyword && (
            <div className="py-24 text-center">
              <h2 className="text-3xl font-bold text-neutral-900">
                Mulai Pencarian
              </h2>

              <p className="mt-4 text-neutral-600">
                Gunakan kolom pencarian di bagian atas untuk menemukan
                artikel.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}