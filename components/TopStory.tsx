import Image from "next/image";
import Link from "next/link";
import { articles } from "../data/articles";

export default function Hero() {
  const featured = articles.find((article) => article.hero);

  if (!featured) return null;

  return (
    <section className="grid md:grid-cols-2 gap-16 items-center">

      <div>
        <p className="uppercase tracking-[0.3em] text-sm text-neutral-500 mb-6">
          Cerita Utama
        </p>

        <Link href={`/articles/${featured.slug}`}>
          <h2 className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-[-0.03em] text-neutral-900 hover:opacity-70 transition cursor-pointer">
            {featured.title}
          </h2>
        </Link>

        <p className="mt-6 text-sm text-neutral-500">
          {featured.date} • {featured.category} • Oleh {featured.author}
        </p>

        <p className="mt-8 text-xl leading-9 text-neutral-700">
          {featured.excerpt}
        </p>
      </div>

      <Link
        href={`/articles/${featured.slug}`}
        className="relative aspect-[4/3] block overflow-hidden"
      >
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          priority
          unoptimized
          sizes="50vw"
          className="object-cover hover:scale-105 transition duration-500"
        />
      </Link>

    </section>
  );
}