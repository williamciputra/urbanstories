import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

type MustReadWidgetProps = {
    articles: HomepageArticle[];
};

export default function MustReadWidget({
    articles,
}: MustReadWidgetProps) {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">

            <h2 className="mb-5 text-lg font-bold text-neutral-900">
                Must Read
            </h2>

            <div className="space-y-5">

                {articles.map((article, index) => (
                    <Link
                        key={article.id}
                        href={`/${article.subcategories?.slug}/${article.slug}`}
                        className="group flex gap-4"
                    >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-sm font-bold text-white">
                            {index + 1}
                        </div>

                        <div>

                            <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 text-neutral-900 transition group-hover:text-neutral-600">
                                {article.title}
                            </h3>

                            <p className="mt-1 text-xs text-neutral-500">
                                {new Date(
                                    article.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </p>

                        </div>

                    </Link>
                ))}

            </div>

        </section>
    );
}