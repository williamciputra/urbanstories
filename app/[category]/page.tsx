import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsFeed from "../../components/NewsFeed";
import { articles } from "../../data/articles";

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
    title: `${formattedCategory} | Urbanstories`,
    description: `Artikel ${formattedCategory} di Urbanstories.`,
  };
}

export default async function CategoryPage({
  params,
}: Props) {
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
      <Header activeCategory={formattedCategory} />

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
              {formattedCategory}
            </span>
          </nav>

          <div className="mt-12">
            <NewsFeed articles={categoryArticles} />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}