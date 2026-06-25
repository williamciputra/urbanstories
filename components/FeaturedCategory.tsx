import Link from "next/link";
import Image from "next/image";
import { articles } from "../data/articles";

interface FeaturedCategoryProps {
  category: string;
}

export default function FeaturedCategory({
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
    <section className="mt-36">

      <div className="flex items-center justify-between">

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
          {category}
        </h2>

        <Link
          href={`/category/${category.toLowerCase()}`}
          className="text-sm text-neutral-500 transition hover:text-black"
        >
          Lihat Semua →
        </Link>

      </div>

      <div className="mt-6 border-t border-neutral-300"></div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">

        <Link
          href={`/articles/${featured.slug}`}
          className="group"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              unoptimized
              sizes="800px"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-neutral-500">
            {featured.category}
          </p>

          <h3 className="mt-3 text-4xl font-bold leading-tight text-neutral-900 transition group-hover:opacity-70">
            {featured.title}
          </h3>

          <p className="mt-5 text-lg leading-8 text-neutral-600">
            {featured.excerpt}
          </p>

          <p className="mt-6 text-sm text-neutral-500">
            {featured.date} • {featured.readTime}
          </p>
        </Link>

        <div className="flex flex-col gap-10">

          {secondary.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group flex gap-5"
            >
              <div className="relative h-32 w-40 flex-shrink-0 overflow-hidden">
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

                <p className="mt-3 text-sm leading-7 text-neutral-600 line-clamp-3">
                  {article.excerpt}
                </p>

                <p className="mt-4 text-sm text-neutral-500">
                  {article.date}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}