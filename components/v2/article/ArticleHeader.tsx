import Image from "next/image";
import Link from "next/link";

import ArticleShare from "./ArticleShare";

import type { PublicArticle } from "@/services/public/articles";
import { CATEGORY_SLUGS } from "@/lib/taxonomy/categories";

type ArticleHeaderProps = {
    article: PublicArticle;
};

export default function ArticleHeader({
    article,
}: ArticleHeaderProps) {
    return (
        <header>

            <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#D71920] lg:gap-2 lg:text-[13px] lg:font-medium">

                <Link
                    href="/"
                    className="transition-colors hover:text-neutral-900"
                >
                    Home
                </Link>

                <span className="mx-1.5">›</span>

                <Link
                    href={`/${Object.entries(CATEGORY_SLUGS).find(([, name]) => name === article.categories?.name)?.[0] ?? ""}`}
                    className="transition-colors hover:text-neutral-900"
                >
                    {article.categories?.name}
                </Link>

                {article.subcategories?.name && (
                    <>
                        <span className="mx-1.5">›</span>

                        <Link
                            href={`/category/${Object.entries(CATEGORY_SLUGS).find(([, name]) => name === article.categories?.name)?.[0] ?? ""}/${article.subcategories.slug}`}
                            className="transition-colors hover:text-neutral-900"
                        >
                            {article.subcategories.name}
                        </Link>
                    </>
                )}

            </nav>

            <h1 className="article-page-title mt-5 max-w-[760px] !text-[24px] font-bold !leading-[1.2] tracking-[-0.03em] text-neutral-900 lg:mt-6 lg:!text-[42px] lg:!leading-[1.1] lg:tracking-[-0.035em]">
                {article.title}
            </h1>

            <div className="mt-3 flex max-w-[760px] flex-wrap items-center justify-between gap-x-4 gap-y-2 lg:mt-3.5">

                <div className="min-w-0 flex flex-wrap items-center gap-1.5 text-[12px] text-[#D71920] lg:gap-2 lg:text-[13px]">

                    <span>{article.authors?.name}</span>

                    <span>•</span>

                    <span>
                        {new Date(
                            article.published_at
                        ).toLocaleDateString(
                            "id-ID",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </span>

                    <span className="hidden lg:inline">•</span>

                    <span className="hidden lg:inline">
                        {new Date(
                            article.published_at
                        ).toLocaleTimeString(
                            "id-ID",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            }
                        )}{" "}
                        WIB
                    </span>

                </div>

                <div className="shrink-0">

                    <ArticleShare
                        title={article.title}
                        url={`https://urbanstories.id/${article.subcategories?.slug ??
                            article.categories?.name.toLowerCase()
                            }/${article.slug}`}
                    />

                </div>

            </div>

            {article.media?.path && (

                <figure className="mt-3 lg:mt-4">

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-200">

                        <Image
                            src={article.media.path}
                            alt={
                                article.media.alt_text ??
                                article.title
                            }
                            fill
                            priority
                            unoptimized
                            sizes="(max-width:1024px) 100vw, 760px"
                            className="object-cover"
                        />

                    </div>

                    {article.media.caption && (
                        <figcaption
                            className="article-image-caption mt-2 text-[12px] italic text-neutral-500 lg:mt-3 lg:text-[13px]"
                            dangerouslySetInnerHTML={{
                                __html: article.media.caption,
                            }}
                        />
                    )}

                </figure>

            )}

        </header>
    );
}