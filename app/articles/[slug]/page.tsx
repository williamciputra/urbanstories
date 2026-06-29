import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { articles } from "../../../data/articles";
import ReadingProgress from "../../../components/ReadingProgress";
import RelatedArticles from "../../../components/RelatedArticles";

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
        <article className="mx-auto max-w-7xl px-6 py-16">

          <div className="ml-16 max-w-3xl">

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-neutral-900 md:text-7xl">
              {article.title}
            </h1>

            <div className="mt-6 text-sm text-neutral-500">
              <p>{article.author}</p>

              <p className="mt-1">
                {article.date} • {article.readTime}
              </p>
            </div>

            <div className="relative mt-10 aspect-[3/2] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>

            {article.imageCaption && (
              <p className="mt-3 text-sm italic text-neutral-500">
                {article.imageCaption}
              </p>
            )}

            <div className="mt-12 space-y-8">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[20px] leading-[2] text-neutral-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <RelatedArticles
              currentSlug={article.slug}
              currentCategory={article.category}
            />

          </div>

        </article>
      </main>
    </>
  );
}