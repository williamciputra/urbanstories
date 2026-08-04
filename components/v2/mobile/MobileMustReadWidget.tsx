import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type MobileMustReadWidgetProps = {
    articles: HomepageArticle[];
};

export default function MobileMustReadWidget({
    articles,
}: MobileMustReadWidgetProps) {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-4">

            <h2 className="mb-4 text-lg font-bold text-neutral-900">
                Must Read
            </h2>

            <div className="space-y-4">

                {articles.map((article, index) => (
                    <Link
                        key={article.id}
                        href={getArticlePath(article)}
                        className="group flex items-start gap-3"
                    >
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-neutral-900 text-[11px] font-bold text-white">
                            {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">

                            <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 text-neutral-900 transition group-hover:text-neutral-600">
                                {article.title}
                            </h3>

                            <p className="mt-0.5 text-[11px] text-neutral-500">
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