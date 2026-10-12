import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type ArticleMustReadProps = {
    articles: HomepageArticle[];
};

export default function ArticleMustRead({
    articles,
}: ArticleMustReadProps) {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2 className="mb-5 flex items-center gap-2 font-bold leading-tight tracking-tight text-neutral-900" style={{ fontSize: "20px" }}>
                <span className="inline-block h-2 w-2 shrink-0 bg-[#D71920]" />
                Must Read
            </h2>

            <div className="space-y-5">
                {articles.map((article, index) => (
                    <Link
                        key={article.id}
                        href={getArticlePath(article)}
                        className="group block"
                    >
                        <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-neutral-900">
                            {article.media?.path && (
                                <Image
                                    src={article.media.path}
                                    alt={article.media.alt_text ?? article.title}
                                    fill
                                    sizes="320px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                            <span className="absolute left-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-sm bg-[#D71920] text-xs font-bold text-white">
                                {index + 1}
                            </span>

                            <div
                                className="absolute inset-x-0 bottom-0 z-10 p-3 pt-16"
                                style={{ fontFamily: "var(--font-article-inter), sans-serif" }}
                            >
                                <h3 className="line-clamp-2 font-extrabold leading-[1.2] text-white" style={{ fontSize: "14px", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 800, textShadow: "0 1px 3px rgba(0,0,0,0.95)" }}>
                                    {article.title}
                                </h3>

                                <p className="mt-2 text-[11px] font-medium leading-tight text-white">
                                    {new Date(article.published_at).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
