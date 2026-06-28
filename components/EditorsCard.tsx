import Image from "next/image";
import Link from "next/link";
import { Article } from "../types/article";

interface Props {
  article: Article;
}

export default function EditorsCard({ article }: Props) {
  return (
    <article className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
      <Link
        href={`/articles/${article.slug}`}
        className="group grid grid-cols-[96px_1fr] gap-3 items-center"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            sizes="96px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {article.category}
          </p>

          <h3 className="mt-1 text-lg font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
            {article.title}
          </h3>
        </div>
      </Link>
    </article>
  );
}