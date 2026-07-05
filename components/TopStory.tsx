import Image from "next/image";
import Link from "next/link";

import { getTopStory } from "@/services/public/articles";

export default async function TopStory() {
  const featured = await getTopStory();

  if (!featured) return null;

  const imageUrl = featured.media?.path
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${featured.media.path}`
    : "";

  console.log("IMAGE URL:", imageUrl);

  return (
    <section>
      <h2 className="mb-3 text-2xl font-semibold text-neutral-900">
        Top Story
      </h2>

      <Link
        href={`/articles/${featured.slug}`}
        className="group block"
      >
        <div className="relative aspect-[24/10] overflow-hidden rounded-sm bg-neutral-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={
                featured.media?.alt_text ??
                featured.title
              }
              fill
              priority
              unoptimized
              sizes="800px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          )}
        </div>

        <div className="pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            {featured.categories?.name}
          </p>

          <h3 className="mt-1 text-3xl font-bold leading-tight tracking-[-0.03em] text-neutral-900 transition group-hover:opacity-70">
            {featured.title}
          </h3>

          <p className="mt-2 text-sm text-neutral-500">
            {new Date(
              featured.published_at
            ).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            {" • Oleh "}
            {featured.authors?.name}
          </p>
        </div>
      </Link>
    </section>
  );
}