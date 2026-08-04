import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type LatestArticleCardProps = {
    article: HomepageArticle;
};

export default function LatestArticleCard({
    article,
}: LatestArticleCardProps) {

    return (

        <Link
            href={getArticlePath(article)}
            className="group block"
        >

            {/* ================= Desktop ================= */}

            <article className="hidden lg:block">

                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-200">

                    {article.media?.path && (

                        <Image
                            src={article.media.path}
                            alt={
                                article.media.alt_text ??
                                article.title
                            }
                            fill
                            unoptimized
                            sizes="250px"
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />

                    )}

                </div>

                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-500">

                    {article.categories?.name}

                </p>

                <h3 className="mt-2 line-clamp-2 text-[15px] font-semibold leading-6 text-neutral-900 transition group-hover:text-neutral-600">

                    {article.title}

                </h3>

                <p className="mt-2 text-xs text-neutral-500">

                    {new Date(
                        article.published_at
                    ).toLocaleDateString(
                        "id-ID",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        }
                    )}

                    {" • "}

                    {new Date(
                        article.published_at
                    ).toLocaleTimeString(
                        "id-ID",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                        }
                    )}

                </p>

            </article>

            {/* ================= Mobile ================= */}

            <article className="flex items-start gap-3 border-b border-neutral-200 py-2.5 first:pt-0 lg:hidden">

                <div className="relative h-[76px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200">

                    {article.media?.path && (

                        <Image
                            src={article.media.path}
                            alt={
                                article.media.alt_text ??
                                article.title
                            }
                            fill
                            unoptimized
                            sizes="112px"
                            className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        />

                    )}

                </div>

                <div className="flex min-w-0 flex-1 flex-col">

                    <p className="mb-1 text-[11px] font-medium text-neutral-500">

                        {article.categories?.name}

                    </p>

                    <h3 className="line-clamp-2 text-[16px] font-semibold leading-5 text-neutral-900 transition group-hover:text-neutral-600">

                        {article.title}

                    </h3>

                    <p className="mt-auto pt-1.5 text-[11px] text-neutral-500">

                        {new Date(
                            article.published_at
                        ).toLocaleDateString(
                            "id-ID",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}

                        {" • "}

                        {new Date(
                            article.published_at
                        ).toLocaleTimeString(
                            "id-ID",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}

                    </p>

                </div>

            </article>

        </Link>

    );

}