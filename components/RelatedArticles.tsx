import Image from "next/image";
import Link from "next/link";

import {
  getRelatedArticles,
} from "@/services/public/articles";

interface RelatedArticlesProps {
  currentSlug: string;
  currentTags: string[];
}

export default async function RelatedArticles({
  currentSlug,
  currentTags,
}: RelatedArticlesProps) {
  const relatedArticles =
    await getRelatedArticles(
      currentSlug,
      currentTags
    );

  if (!relatedArticles.length) {
    return null;
  }

  return (
    <section className="mt-32 border-t border-neutral-300 pt-16">

      <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
        Artikel Terkait
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-4">

        {relatedArticles.map((article) => {
          const imageUrl =
            article.media?.path ?? "";

          return (
            <Link
              key={article.id}
              href={`/${article.subcategories?.slug}/${article.slug}`}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100">

                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={
                      article.media?.alt_text ??
                      article.title
                    }
                    fill
                    sizes="400px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-neutral-500">
                {article.categories?.name}
              </p>

              <h3 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 transition group-hover:opacity-70">
                {article.title}
              </h3>

              <p className="mt-3 text-sm text-neutral-500">
                {new Date(
                  article.published_at
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

            </Link>
          );
        })}

      </div>

    </section>
  );
}