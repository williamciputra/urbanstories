import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ArticleCard from "../../../components/ArticleCard";
import { articles } from "../../../data/articles";

interface Props {
  params: Promise<{
    author: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { author } = await params;

  const authorName = author
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

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

  const authorName = author
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  const authorArticles = articles.filter(
    (article) => article.author === authorName
  );

  if (authorArticles.length === 0) {
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

          <section className="mt-12 flex flex-col items-center text-center">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt={authorName}
              width={140}
              height={140}
              unoptimized
              className="rounded-full object-cover"
            />

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
              {authorName}
            </h1>

            <p className="mt-6 max-w-2xl leading-8 text-neutral-600">
              Jurnalis dan editor dengan pengalaman lebih dari delapan tahun di
              industri media digital. Menulis seputar bisnis, teknologi,
              kesehatan, serta gaya hidup urban melalui pendekatan jurnalistik
              yang mendalam dan mudah dipahami.
            </p>

            <div className="mt-8 flex items-center gap-6 text-sm uppercase tracking-[0.2em] text-neutral-500">
              <span>{authorArticles.length} Artikel</span>
              <span>•</span>
              <span>Urbanstories</span>
            </div>
          </section>

          <div className="my-16 border-b border-neutral-200" />

          <section className="grid gap-14 md:grid-cols-2 lg:grid-cols-3">
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