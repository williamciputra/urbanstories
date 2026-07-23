import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";

import { getArticlesByTag } from "@/services/public/articles";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {
    const { slug } = await params;

    const tag = slug
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

    return {
        title: `${tag} | Urbanstories`,
        description: `Artikel dengan tag ${tag} di Urbanstories.`,
    };
}

export default async function TagPage({
    params,
}: Props) {
    const { slug } = await params;

    const articles =
        await getArticlesByTag(slug);

    if (articles.length === 0) {
        notFound();
    }

    const tag = slug
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ");

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#FAF8F3]">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <nav className="flex items-center gap-2 text-sm text-neutral-500">
                        <Link
                            href="/"
                            className="transition hover:text-black"
                        >
                            Home
                        </Link>

                        <span>/</span>

                        <span className="font-medium text-neutral-900">
                            Tag
                        </span>

                        <span>/</span>

                        <span className="font-medium text-neutral-900">
                            {tag}
                        </span>
                    </nav>

                    <div className="mt-12">
                        <NewsFeed articles={articles} />
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}