import Image from "next/image";
import Link from "next/link";

import ArticleShare from "./ArticleShare";

import type { PublicArticle } from "@/services/public/articles";

type ArticleHeaderProps = {
    article: PublicArticle;
};

export default function ArticleHeader({
    article,
}: ArticleHeaderProps) {
    return (
        <header>

            <nav className="flex flex-wrap items-center gap-2 text-[12px] text-neutral-500 lg:text-[13px] lg:font-medium">

                <Link
                    href="/"
                    className="transition-colors hover:text-neutral-900"
                >
                    Home
                </Link>

                <span>/</span>

                <Link
                    href={`/${article.categories?.name.toLowerCase()}`}
                    className="transition-colors hover:text-neutral-900"
                >
                    {article.categories?.name}
                </Link>

                {article.subcategories?.name && (
                    <>
                        <span>/</span>

                        <Link
                            href={`/${article.subcategories.slug}`}
                            className="transition-colors hover:text-neutral-900"
                        >
                            {article.subcategories.name}
                        </Link>
                    </>
                )}

            </nav>

            <h1 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-neutral-900 lg:mt-4 lg:text-[46px] lg:leading-[1.08] lg:tracking-[-0.035em]">
                {article.title}
            </h1>

            <div className="mt-4 flex items-center justify-between gap-3 lg:mt-5">

                <div className="min-w-0 flex flex-wrap items-center gap-1.5 text-[12px] text-neutral-500 lg:gap-2 lg:text-[14px]">

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

                <div className="lg:-translate-x-3">

                    <ArticleShare
                        title={article.title}
                        url={`https://urbanstories.id/${article.subcategories?.slug}/${article.slug}`}
                    />

                </div>

            </div>

            {article.media?.path && (

                <figure className="mt-6 lg:mt-8">

                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200 lg:aspect-[4/3]">

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

                    {article.media.title && (
                        <figcaption className="mt-2 text-[12px] italic text-neutral-500 lg:mt-3 lg:text-[13px]">
                            {article.media.title}
                        </figcaption>
                    )}

                </figure>

            )}

        </header>
    );
}