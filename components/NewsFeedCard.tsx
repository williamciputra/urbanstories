import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

export default function NewsFeedCard({
  article,
}: {
  article: HomepageArticle;
}) {
  const imageUrl =
    article.media?.path ?? "";

  return (
    <Link
      href={getArticlePath(article)}
      className="group block"
    >
      <article className="grid grid-cols-[120px_1fr] items-center gap-5 border-b border-neutral-200 p-5 last:border-b-0">

        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100">

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={
                article.media?.alt_text ??
                article.title
              }
              fill
              sizes="120px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}

        </div>

        <div className="max-w-[440px]">

          <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            {article.categories?.name}
          </p>

          <h3 className="mt-2 text-[1.75rem] font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
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
            {" • Oleh "}
            {article.authors?.name}
          </p>

        </div>

      </article>
    </Link>
  );
}