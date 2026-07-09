import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

interface FeaturedCategoryProps {
  category: string;
  articles: HomepageArticle[];
}

export default function CategorySection({
  category,
  articles,
}: FeaturedCategoryProps) {
  if (articles.length === 0) {
    return null;
  }

  const featured = articles[0];
  const secondary = articles.slice(1, 3);

  const featuredImage =
    featured.media?.path
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${featured.media.path}`
      : "";

  return (
    <section className="mt-28">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-neutral-900">
          {category}
        </h2>

        <Link
          href={`/${category.toLowerCase()}`}
          className="text-sm font-medium text-neutral-600 transition hover:text-black"
        >
          Lihat Semua →
        </Link>

      </div>

      <div className="mt-3 mb-6 border-b border-neutral-300"></div>

      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">

        <Link
          href={`/articles/${featured.slug}`}
          className="group"
        >

          <div className="relative aspect-[5/2] overflow-hidden rounded-sm bg-neutral-100">

            {featuredImage && (
              <Image
                src={featuredImage}
                alt={
                  featured.media?.alt_text ??
                  featured.title
                }
                fill
                sizes="800px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            )}

          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
            {featured.categories?.name}
          </p>

          <h3 className="mt-2 text-3xl font-bold leading-tight tracking-[-0.02em] text-neutral-900 transition group-hover:opacity-70">
            {featured.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            {new Date(
              featured.published_at
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

        </Link>

        <div className="flex flex-col divide-y divide-neutral-200">

          {secondary.map((article) => {
            const imageUrl =
              article.media?.path
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${article.media.path}`
                : "";

            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex gap-4 py-4 first:pt-0 last:pb-0"
              >

                <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-sm bg-neutral-100">

                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={
                        article.media?.alt_text ??
                        article.title
                      }
                      fill
                      sizes="250px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}

                </div>

                <div>

                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    {article.categories?.name}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-500">
                    {new Date(
                      article.published_at
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}