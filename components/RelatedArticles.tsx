import Image from "next/image";
import Link from "next/link";
import { articles } from "../data/articles";

interface RelatedArticlesProps {
  currentSlug: string;
  currentTags: string[];
}

export default function RelatedArticles({
  currentSlug,
  currentTags,
}: RelatedArticlesProps) {
  const relatedArticles = articles
    .filter((article) => {
      if (article.slug === currentSlug) return false;

      return article.tags.some((tag) =>
        currentTags.includes(tag)
      );
    })
    .slice(0, 4);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-32 border-t border-neutral-300 pt-16">
      <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
        Artikel Terkait
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug}`}
            className="group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                unoptimized
                sizes="400px"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <p className="mt-5 text-xs uppercase tracking-[0.25em] text-neutral-500">
              {article.category}
            </p>

            <h3 className="mt-2 text-2xl font-bold leading-tight text-neutral-900 transition group-hover:opacity-70">
              {article.title}
            </h3>

            <p className="mt-3 text-sm text-neutral-500">
              {article.date} • {article.readTime}
            </p>

          </Link>
        ))}
      </div>
    </section>
  );
}