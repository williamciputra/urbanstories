import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ArticleCard from "../../../components/ArticleCard";
import { articles } from "../../../data/articles";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  return {
    title: formattedCategory,
    description: `Jelajahi artikel kategori ${formattedCategory} di Urbanstories.`,
    openGraph: {
      title: `${formattedCategory} | Urbanstories`,
      description: `Temukan berbagai artikel seputar ${formattedCategory} di Urbanstories.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedCategory} | Urbanstories`,
      description: `Temukan berbagai artikel seputar ${formattedCategory} di Urbanstories.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const categoryArticles = articles.filter(
    (article) =>
      article.category.toLowerCase() === category.toLowerCase()
  );

  if (categoryArticles.length === 0) {
    notFound();
  }

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
            {formattedCategory}
          </h1>

          <p className="mt-4 text-neutral-500">
            {categoryArticles.length} artikel ditemukan
          </p>

          <div className="mt-12 border-b border-neutral-200" />

          <div className="mt-16 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
            {categoryArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}