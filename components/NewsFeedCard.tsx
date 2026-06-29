import Image from "next/image";
import Link from "next/link";
import { Article } from "../types/article";

export default function NewsFeedCard({
  article,
}: {
  article: Article;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block"
    >
      <article className="grid grid-cols-[120px_1fr] gap-5 items-center border-b border-neutral-200 p-5 last:border-b-0">

        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="120px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="max-w-[440px]">

          <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            {article.category}
          </p>

          <h3 className="mt-2 text-[1.75rem] font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>

          <p className="mt-3 text-sm text-neutral-500">
            {article.date} • {article.readTime}
          </p>

        </div>

      </article>
    </Link>
  );
}