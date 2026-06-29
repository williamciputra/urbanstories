import Link from "next/link";
import Image from "next/image";
import { articles } from "../data/articles";

interface FeaturedCategoryProps {
  category: string;
}

export default function CategorySection({
  category,
}: FeaturedCategoryProps) {
  const categoryArticles = articles
    .filter(
      (article) =>
        article.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, 3);

  if (categoryArticles.length === 0) return null;

  const featured = categoryArticles[0];
  const secondary = categoryArticles.slice(1);

  return (
    <section className="mt-28">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-semibold text-neutral-900">
          {category}
        </h2>

        <Link
          href={`/category/${category.toLowerCase()}`}
          className="text-sm font-medium text-neutral-600 transition hover:text-black"
        >
          Lihat Semua →
        </Link>

      </div>

      <div className="mt-3 mb-6 border-b border-neutral-300"></div>

      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">

        <Link
          href={`/articles/${featured.slug}`}
          className="group"
        >
          <div className="relative aspect-[5/2] overflow-hidden rounded-sm">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              unoptimized
              sizes="800px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <p className="mt-4 text-xs uppercase tracking-[0.25em] text-neutral-500">
            {featured.category}
          </p>

          <h3 className="mt-2 text-3xl font-bold leading-tight tracking-[-0.02em] text-neutral-900 transition group-hover:opacity-70">
            {featured.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            {featured.date} • {featured.readTime}
          </p>
        </Link>

        <div className="flex flex-col divide-y divide-neutral-200">

          {secondary.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  unoptimized
                  sizes="250px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div>

                <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                  {article.category}
                </p>

                <h3 className="mt-2 text-xl font-semibold leading-snug text-neutral-900 transition group-hover:opacity-70">
                  {article.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-500">
                  {article.date} • {article.readTime}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}