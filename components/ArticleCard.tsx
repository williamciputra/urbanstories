import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

interface ArticleCardProps {
  article: HomepageArticle;
}

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  const imageUrl =
    article.media?.path ?? "";

  return (
    <Link
      href={`/${article.subcategories?.slug}/${article.slug}`}
      className="group block"
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

      <p className="mt-6 text-xs uppercase tracking-[0.24em] text-neutral-500">
        {article.categories?.name}
      </p>

      <h2 className="mt-3 text-2xl font-bold leading-snug text-neutral-900 transition group-hover:opacity-70">
        {article.title}
      </h2>

      <p
        className="mt-4 line-clamp-2 leading-7 text-neutral-600"
        dangerouslySetInnerHTML={{
          __html: article.excerpt,
        }}
      />

      <p className="mt-5 text-sm text-neutral-500">
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
}