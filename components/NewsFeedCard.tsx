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
      <article className="grid items-center gap-8 md:grid-cols-[320px_1fr]">

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="320px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
            {article.category}
          </p>

          <h3 className="mt-3 text-3xl font-semibold leading-tight text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>

          <p className="mt-5 leading-8 text-neutral-600">
            {article.excerpt}
          </p>

          <p className="mt-6 text-sm text-neutral-500">
            {article.date} • Oleh {article.author}
          </p>

        </div>

      </article>
    </Link>
  );
}