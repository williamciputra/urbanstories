import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    getArticleBySlug,
} from "@/services/public/articles";

import ReadingProgress from "../../../components/ReadingProgress";
import RelatedArticles from "../../../components/RelatedArticles";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const {
        slug,
        category,
    } = await params;

    const article =
        await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const imageUrl =
        article.media?.path;

    return {
        title: article.title,

        description: article.excerpt,

        alternates: {
            canonical: `/${article.subcategories?.slug}/${article.slug}`,
        },

        authors: [
            {
                name:
                    article.authors?.name ??
                    "Urbanstories",
            },
        ],

        keywords: article.tags,

        openGraph: {
            type: "article",

            url: `https://urbanstories.id/${article.subcategories?.slug}/${article.slug}`,

            title: article.title,

            description: article.excerpt,

            publishedTime:
                article.published_at,

            authors: article.authors?.name
                ? [article.authors.name]
                : [],

            images: imageUrl
                ? [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    },
                ]
                : [],
        },

        twitter: {
            card: "summary_large_image",

            title: article.title,

            description: article.excerpt,

            images: imageUrl
                ? [imageUrl]
                : [],
        },
    };
}

export default async function ArticlePage({ params }: Props) {
    const {
        slug,
        category,
    } = await params;

    const article =
        await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const breadcrumbs = [
        {
            name: "Home",
            url: "https://urbanstories.id",
        },
        {
            name:
                article.categories?.name ?? "",
            url: `https://urbanstories.id/${article.categories?.name.toLowerCase()}`,
        },
        {
            name: article.title,
            url: `https://urbanstories.id/${article.subcategories?.slug}/${article.slug}`,
        },
    ];

    return (
        <>

            <ArticleSchema article={article} />

            <BreadcrumbSchema items={breadcrumbs} />
            <ReadingProgress />

            <Header />

            <main className="min-h-screen bg-[#FAF8F3]">
                <article className="mx-auto max-w-7xl px-6 py-16">

                    <div className="ml-16 max-w-3xl">

                        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
                            <Link
                                href="/"
                                className="transition hover:text-black"
                            >
                                Home
                            </Link>

                            <span>/</span>

                            <Link
                                href={`/category/${article.categories?.name.toLowerCase()}/${article.subcategories?.slug}`}
                                className="transition hover:text-black"
                            >
                                {article.categories?.name}
                            </Link>

                            {article.subcategories?.name && (
                                <>
                                    <span>/</span>

                                    <Link
                                        href={`/category/${article.categories?.name.toLowerCase()}/${article.subcategories?.slug}`}
                                        className="transition hover:text-black"
                                    >
                                        {article.subcategories.name}
                                    </Link>
                                </>
                            )}
                        </nav>

                        <h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-neutral-900 md:text-7xl">
                            {article.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">

                            <span>Oleh {article.authors?.name}</span>

                            <span>•</span>

                            <span>
                                {new Date(
                                    article.published_at
                                ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>

                        </div>

                        <div className="relative mt-10 aspect-[3/2] overflow-hidden">
                            {article.media?.path && (
                                <Image
                                    src={article.media.path}
                                    alt={
                                        article.media.alt_text ??
                                        article.title
                                    }
                                    fill
                                    priority
                                    unoptimized
                                    className="object-cover"
                                />
                            )}
                        </div>

                        {article.media?.title && (
                            <p className="mt-3 text-sm italic text-neutral-500">
                                {article.media.title}
                            </p>
                        )}

                        <div
                            className="article-content mt-12"
                            dangerouslySetInnerHTML={{
                                __html: article.content,
                            }}
                        />

                        <RelatedArticles
                            currentSlug={article.slug}
                            currentTags={article.tags}
                        />

                    </div>

                </article>
            </main>
            <Footer />
        </>
    );
}