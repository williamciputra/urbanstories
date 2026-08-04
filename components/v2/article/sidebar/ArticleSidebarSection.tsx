import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type ArticleSidebarSectionProps = {
    title: string;
    href: string;
    articles: HomepageArticle[];
};

export default function ArticleSidebarSection({
    title,
    href,
    articles,
}: ArticleSidebarSectionProps) {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-6">
            <Link
                href={href}
                className="mb-5 flex items-center justify-between group"
            >
                <h2 className="text-lg font-bold text-neutral-900 transition-colors group-hover:text-neutral-600">
                    {title}
                </h2>

                <span className="text-lg text-neutral-400 transition-transform group-hover:translate-x-1">
                    →
                </span>
            </Link>

            <div>
                {articles.map((article) => (
                    <Link
                        key={article.id}
                        href={getArticlePath(article)}
                        className="block border-b border-neutral-100 py-3 first:pt-0 last:border-b-0 last:pb-0"
                    >
                        <h3 className="text-[15px] font-semibold leading-6 text-neutral-900 transition hover:text-neutral-600">
                            {article.title}
                        </h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}