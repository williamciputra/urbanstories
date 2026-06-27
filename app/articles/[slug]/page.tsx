import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { articles } from "../../../data/articles";
import ReadingProgress from "../../../components/ReadingProgress";
import RelatedArticles from "../../../components/RelatedArticles";
import ShareArticle from "../../../components/ShareArticle";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Urbanstories",
    };
  }

  return {
    title: article.title,

    description: article.excerpt,

    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.image,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const paragraphs = article.content
    .trim()
    .split("\n\n")
    .filter((text) => text.trim() !== "");

  return (
    <>
      <ReadingProgress />

      <main className="min-h-screen bg-[#FAF8F3]">
        <article className="mx-auto max-w-5xl px-6 py-24">

          <p className="uppercase tracking-[0.3em] text-sm text-neutral-500">
            {article.category}
          </p>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-neutral-900 md:text-7xl">
            {article.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <span>Oleh {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <div className="mt-12 border-t border-neutral-300"></div>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="mx-auto mt-20 max-w-3xl space-y-10">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[22px] leading-[2.1] text-neutral-700"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <ShareArticle />

          <RelatedArticles
            currentSlug={article.slug}
            currentCategory={article.category}
          />

        </article>
      </main>
    </>
  );
}