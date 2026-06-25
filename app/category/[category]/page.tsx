import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
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
    <main className="min-h-screen bg-[#FAF8F3]">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <Link
          href="/"
          className="text-sm text-neutral-500 transition hover:text-black"
        >
          ← Kembali ke Beranda
        </Link>

        <h1 className="mt-8 text-6xl font-bold tracking-tight text-neutral-900">
          {formattedCategory}
        </h1>

        <p className="mt-4 text-neutral-500">
          {categoryArticles.length} artikel
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">

          {categoryArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="400px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-neutral-500">
                {article.category}
              </p>

              <h2 className="mt-2 text-3xl font-bold leading-tight text-neutral-900 transition group-hover:opacity-70">
                {article.title}
              </h2>

              <p className="mt-4 leading-7 text-neutral-600">
                {article.excerpt}
              </p>

              <p className="mt-5 text-sm text-neutral-500">
                {article.date} • {article.readTime}
              </p>

            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}