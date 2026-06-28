import Image from "next/image";
import Link from "next/link";
import { articles } from "../data/articles";

export default function TopStory() {
  const featured = articles.find((article) => article.hero);

  if (!featured) return null;

  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold text-neutral-900">
        Top Story
      </h2>

      <Link
        href={`/articles/${featured.slug}`}
        className="group block"
      >
        <div className="relative aspect-[24/10] overflow-hidden rounded-sm">
          <Image
            src={featured.image}
            alt={featured.title}
            fill
            priority
            unoptimized
            sizes="800px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {featured.category}
          </p>

          <h3 className="mt-1 text-3xl font-bold leading-tight tracking-[-0.03em] text-neutral-900 transition group-hover:opacity-70">
            {featured.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            {featured.date} • Oleh {featured.author} • {featured.readTime}
          </p>
        </div>
      </Link>
    </section>
  );
}