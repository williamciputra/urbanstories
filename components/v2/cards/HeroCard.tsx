import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type HeroCardProps = {
  article: HomepageArticle | null;
};

export default function HeroCard({
  article,
}: HeroCardProps) {
  if (!article) return null;

  const imageUrl = article.media?.path ?? "";

  return (
    <Link
      href={getArticlePath(article)}
      className="block"
    >
      <article className="group relative w-full overflow-hidden rounded-xl">

        <div className="relative aspect-[16/8] bg-neutral-200">

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={article.media?.alt_text ?? article.title}
              fill
              priority
              unoptimized
              sizes="840px"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-7">

            <p className="text-[13px] font-semibold tracking-[0.02em] text-neutral-200">
              {article.categories?.name}
            </p>

            <h1 className="mt-3 max-w-[690px] text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-white">
              {article.title}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-[13px] text-neutral-300">

              <span>
                {new Date(article.published_at).toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </span>

              <span>•</span>

              <span>{article.authors?.name}</span>

            </div>

          </div>

        </div>

      </article>
    </Link>
  );
}