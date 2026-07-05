import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

interface Props {
  article: HomepageArticle;
}

export default function EditorsCard({
  article,
}: Props) {
  const imageUrl = article.media?.path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${article.media.path}`
    : "";

  return (
    <article className="border-b border-neutral-200 py-2 last:border-b-0 last:pb-0">
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[84px_1fr] items-center gap-3"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={
                article.media?.alt_text ??
                article.title
              }
              fill
              unoptimized
              sizes="84px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {article.categories?.name}
          </p>

          <h3 className="mt-1 text-[17px] font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}