import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { V3Header as Header, V3Footer as Footer } from "@/components/v3/shared/V3Chrome";
import V3AuthorArticleList from "@/components/v3/category/V3AuthorArticleList";

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

  const authorArticles =
    await getArticlesByAuthor(author);

  if (!authorArticles.length) {
    notFound();
  }

  const authorName =
    authorArticles[0]?.authors?.name ??
    formatAuthorName(author);

  const authorAvatar = authorArticles[0]?.authors?.avatarUrl;
  const authorBio = authorArticles[0]?.authors?.bio;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-5 pb-8 sm:px-6 sm:pt-6 sm:pb-10 lg:pt-8 lg:pb-12">
          <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#D71920] lg:gap-2 lg:text-[13px] lg:font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-neutral-900"
            >
              Home
            </Link>

            <span className="mx-1.5">›</span>

            <span>{authorName}</span>
          </nav>

          <section className="mt-7 flex flex-col items-center text-center sm:mt-8">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={`Foto profil ${authorName}`}
                width={140}
                height={140}
                className="h-[140px] w-[140px] rounded-full border border-neutral-200 object-cover"
              />
            ) : (
              <div
                aria-label={`Profil ${authorName}`}
                className="flex h-[140px] w-[140px] items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-3xl font-semibold text-neutral-600"
              >
                {authorName.split(/\s+/).map((part) => part[0]).join("").slice(0, 2)}
              </div>
            )}

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
              {authorName}
            </h1>

            {authorBio ? (
              <p className="mt-3 max-w-2xl whitespace-pre-line leading-7 text-neutral-600">
                {authorBio}
              </p>
            ) : null}

            <div className="mt-5 flex items-center gap-3 text-xs font-medium tracking-[0.12em] text-neutral-500 md:text-sm">
              <span>
                {authorArticles.length} Artikel
              </span>

              <span>•</span>

              <span>Urbanstories</span>
            </div>
          </section>

          <div className="my-10 border-b border-neutral-200 sm:my-12" />

          <V3AuthorArticleList articles={authorArticles} />
        </div>
      </main>

      <Footer />
    </>
  );
}