import Image from "next/image";
import Link from "next/link";
import { Article } from "../types/article";

interface Props {
  article: Article;
  featured?: boolean;
}

export default function EditorsCard({
  article,
  featured = false,
}: Props) {
  if (featured) {
    return (
      <article>
        <Link
          href={`/articles/${article.slug}`}
          className="block group"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              unoptimized
              sizes="800px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </div>

          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-neutral-500">
            {article.category}
          </p>

          <h3 className="mt-3 text-5xl font-semibold leading-tight text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>

          <p className="mt-5 text-neutral-500">
            {article.readTime}
          </p>
        </Link>
      </article>
    );
  }

  return (
    <article>
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[120px_1fr] gap-5 items-center"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="120px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            {article.category}
          </p>

          <h3 className="mt-2 text-2xl font-semibold leading-tight text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>

          <p className="mt-3 text-neutral-500">
            {article.readTime}
          </p>
        </div>
      </Link>
    </article>
  );
}