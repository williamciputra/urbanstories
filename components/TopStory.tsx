import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

type TopStoryProps = {
  article: HomepageArticle | null;
};

export default function TopStory({
  article,
}: TopStoryProps) {
  if (!article) return null;

  const imageUrl =
    article.media?.path ?? "";

  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold text-neutral-900">
        Top Story
      </h2>

      <Link
        href={`/${article.subcategories?.slug}/${article.slug}`}
        className="group block"
      >
        <div className="relative aspect-[24/10] overflow-hidden rounded-sm bg-neutral-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={
                article.media?.alt_text ??
                article.title
              }
              fill
              priority
              unoptimized
              sizes="800px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {article.categories?.name}
          </p>

          <h3 className="mt-1 text-3xl font-bold leading-tight tracking-[-0.03em] text-neutral-900 transition group-hover:opacity-70">
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
            {" • Oleh "}
            {article.authors?.name}
          </p>
        </div>
      </Link>
    </section>
  );
}