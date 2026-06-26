import type { Metadata } from "next";
import Link from "next/link";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ArticleCard from "../../components/ArticleCard";
import { articles } from "../../data/articles";

export const metadata: Metadata = {
  title: "Pencarian | Urbanstories",
  description: "Temukan artikel yang Anda cari di Urbanstories.",
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

  const results = keyword
    ? articles.filter((article) => {
        const target = [
          article.title,
          article.excerpt,
          article.category,
          article.author,
          article.content,
        ]
          .join(" ")
          .toLowerCase();

        return target.includes(keyword);
      })
    : [];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-500 transition hover:text-black"
          >
            ← Kembali ke Beranda
          </Link>

          <h1 className="mt-8 text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Hasil Pencarian
          </h1>

          <p className="mt-5 text-lg text-neutral-600">
            {keyword ? (
              <>
                Menampilkan hasil untuk{" "}
                <span className="font-semibold text-neutral-900">
                  "{q}"
                </span>
              </>
            ) : (
              "Masukkan kata kunci untuk mencari artikel."
            )}
          </p>

          <div className="mt-12 border-b border-neutral-200" />

          {keyword && results.length > 0 && (
            <>
              <p className="mt-10 text-neutral-500">
                {results.length} artikel ditemukan
              </p>

              <section className="mt-12 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
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
                Gunakan kolom pencarian di bagian atas untuk menemukan artikel.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}