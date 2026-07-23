import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";
import ArticleCard from "@/components/ArticleCard";

import { getArticlesByAuthor } from "@/services/public/articles";

interface Props {
  params: Promise<{
    author: string;
  }>;
}

function formatAuthorName(slug: string) {
  return slug
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { author } = await params;

  const authorName =
    formatAuthorName(author);

  return {
    title: `${authorName} | Urbanstories`,
    description: `Baca seluruh artikel karya ${authorName} di Urbanstories.`,

    openGraph: {
      title: `${authorName} | Urbanstories`,
      description: `Temukan seluruh artikel karya ${authorName}.`,
    },

    twitter: {
      card: "summary_large_image",
      title: `${authorName} | Urbanstories`,
      description: `Temukan seluruh artikel karya ${authorName}.`,
    },
  };
}

export default async function AuthorPage({
  params,
}: Props) {
  const { author } = await params;

  const authorName =
    formatAuthorName(author);

  const authorArticles =
    await getArticlesByAuthor(author);

  if (!authorArticles.length) {
    notFound();
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
              {authorName}
            </span>
          </nav>

          <section className="mt-12 flex flex-col items-center text-center">
            <Image
              src="/avatar-default.png"
              alt={authorName}
              width={140}
              height={140}
              priority
              className="rounded-full border border-neutral-200 bg-white object-cover"
            />

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
              {authorName}
            </h1>

            <p className="mt-6 max-w-2xl leading-8 text-neutral-600">
              Kumpulan artikel yang ditulis oleh penulis Urbanstories. Profil,
              foto, dan informasi penulis akan ditampilkan secara otomatis saat
              tersedia.
            </p>

            <div className="mt-8 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500 md:text-sm">
              <span>
                {authorArticles.length} Artikel
              </span>

              <span>•</span>

              <span>Urbanstories</span>
            </div>
          </section>

          <div className="my-16 border-b border-neutral-200" />

          <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {authorArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}