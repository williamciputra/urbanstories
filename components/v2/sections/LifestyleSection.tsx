import Link from "next/link";
import Image from "next/image";

import type { HomepageArticle } from "@/services/public/articles";

type LifestyleSectionProps = {
    articles: HomepageArticle[];
};

export default function LifestyleSection({
    articles,
}: LifestyleSectionProps) {
    const featured = articles[0];
    const list = articles.slice(1, 5);

    return (
        <section className="-mt-2 rounded-xl border border-neutral-200 bg-white p-4 lg:p-6">

            <div className="mb-4 flex items-center justify-between lg:mb-5">

                <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 lg:text-2xl">
                    Lifestyle
                </h2>

                <Link
                    href="/lifestyle"
                    className="text-xs font-medium text-neutral-600 transition-colors duration-200 hover:text-neutral-900"
                >
                    Lihat semua →
                </Link>

            </div>

            {/* ================= Desktop ================= */}

            <div className="hidden grid-cols-[1.65fr_1fr] items-stretch gap-5 lg:grid">

                <Link
                    href={`/${featured.subcategories?.slug}/${featured.slug}`}
                    className="block"
                >
                    <article className="group relative overflow-hidden rounded-xl">

                        <div className="relative aspect-[16/10] bg-neutral-200">

                            {featured.media?.path && (
                                <Image
                                    src={featured.media.path}
                                    alt={featured.media?.alt_text ?? featured.title}
                                    fill
                                    unoptimized
                                    sizes="620px"
                                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5">

                                <h3 className="max-w-[90%] text-[18px] font-semibold leading-6 text-white">
                                    {featured.title}
                                </h3>

                                <p className="mt-2 text-xs text-white/80">
                                    {new Date(
                                        featured.published_at
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>

                            </div>

                        </div>

                    </article>
                </Link>

                <div className="flex h-full flex-col justify-between">

                    {list.map((article) => (
                        <article key={article.id}>

                            <Link
                                href={`/${article.subcategories?.slug}/${article.slug}`}
                            >
                                <h3 className="text-[15px] font-semibold leading-6 text-neutral-900 transition hover:text-neutral-600">
                                    {article.title}
                                </h3>
                            </Link>

                            <p className="mt-1 text-xs text-neutral-500">
                                {new Date(
                                    article.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                        </article>
                    ))}

                </div>

            </div>

            {/* ================= Mobile ================= */}

            <div className="lg:hidden">

                <Link
                    href={`/${featured.subcategories?.slug}/${featured.slug}`}
                    className="block"
                >
                    <article className="group overflow-hidden rounded-2xl">

                        <div className="relative aspect-[16/10] bg-neutral-200">

                            {featured.media?.path && (
                                <Image
                                    src={featured.media.path}
                                    alt={featured.media?.alt_text ?? featured.title}
                                    fill
                                    unoptimized
                                    sizes="390px"
                                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                            <div className="absolute inset-x-0 bottom-0 p-5">

                                <p className="mb-1.5 text-xs font-medium text-white/90">
                                    {new Date(
                                        featured.published_at
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </p>

                                <h3 className="line-clamp-2 text-[20px] font-bold leading-tight text-white">
                                    {featured.title}
                                </h3>

                            </div>

                        </div>

                    </article>
                </Link>

                <div className="mt-3 divide-y divide-neutral-200">

                    {list.map((article) => (
                        <article
                            key={article.id}
                            className="py-3 first:pt-0 last:pb-0"
                        >
                            <Link
                                href={`/${article.subcategories?.slug}/${article.slug}`}
                            >
                                <h3 className="text-[17px] font-semibold leading-6 text-neutral-900 transition hover:text-neutral-600">
                                    {article.title}
                                </h3>
                            </Link>

                            <p className="mt-1 text-xs text-neutral-500">
                                {new Date(
                                    article.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                        </article>
                    ))}

                </div>

            </div>

        </section>
    );
}