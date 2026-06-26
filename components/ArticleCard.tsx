import Link from "next/link";
import Image from "next/image";
import { articles } from "../data/articles";

type Article = (typeof articles)[number];

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({
  article,
}: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
        <Image
          src={article.image}
          alt={article.title}
          fill
          unoptimized
          sizes="400px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.24em] text-neutral-500">
        {article.category}
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-tight text-neutral-900 transition group-hover:opacity-70">
        {article.title}
      </h2>

      <p className="mt-4 leading-7 text-neutral-600">
        {article.excerpt}
      </p>

      <p className="mt-6 text-sm text-neutral-500">
        {article.date} • {article.readTime}
      </p>
    </Link>
  );
}