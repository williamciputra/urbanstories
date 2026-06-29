import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { articles } from "../../../data/articles";
import ReadingProgress from "../../../components/ReadingProgress";
import RelatedArticles from "../../../components/RelatedArticles";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

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

      <Header activeCategory={article.category} />

      <main className="min-h-screen bg-[#FAF8F3]">
        <article className="mx-auto max-w-7xl px-6 py-16">

          <div className="ml-16 max-w-3xl">

            <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <Link
                href="/"
                className="transition hover:text-black"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href={`/${article.category.toLowerCase()}`}
                className="transition hover:text-black"
              >
                {article.category}
              </Link>

              {article.subcategory && (
                <>
                  <span>/</span>

                  <Link
                    href={`/${article.category.toLowerCase()}/${article.subcategory.toLowerCase()}`}
                    className="transition hover:text-black"
                  >
                    {article.subcategory}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-neutral-900 md:text-7xl">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">

              <span>Oleh {article.author}</span>

              <span>•</span>

              <span>{article.date}</span>

              <span>•</span>

              <span>{article.readTime}</span>

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
                <div key={index}>
                  <p className="text-[20px] leading-[2] text-neutral-700">
                    {paragraph}
                  </p>

                  {index === 1 && (
                    <p className="mt-6 text-lg leading-8 text-neutral-800">
                      <span className="font-semibold">
                        Baca juga:{" "}
                      </span>

                      <Link
                        href="/articles/mengapa-kota-ramah-pejalan-kaki"
                        className="font-bold text-blue-600 underline underline-offset-2 hover:text-blue-700"
                      >
                        Mengapa Kota Ramah Pejalan Kaki Membuat Hidup Lebih Berkualitas
                      </Link>
                    </p>
                  )}
                </div>
              ))}
            </div>

            <RelatedArticles
              currentSlug={article.slug}
              currentTags={article.tags}
            />

          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}