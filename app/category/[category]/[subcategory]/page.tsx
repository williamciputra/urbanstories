import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsFeed from "@/components/NewsFeed";

import {
    getArticlesBySubcategory,
} from "@/services/public/articles";

import {
    getCategoryName,
} from "@/lib/taxonomy/categories";

import {
    getSubcategoryName,
} from "@/lib/taxonomy/subcategories";

interface Props {
    params: Promise<{
        category: string;
        subcategory: string;
    }>;
}

export async function generateMetadata({
    params,
}: Props): Promise<Metadata> {

    const {
        category,
        subcategory,
    } = await params;

    const categoryName =
        getCategoryName(category);

    const subcategoryName =
        getSubcategoryName(
            category,
            subcategory
        );

    return {
        title: `${subcategoryName} | Urbanstories`,
        description: `Artikel ${subcategoryName} di kategori ${categoryName}.`,
    };
}

export default async function SubcategoryPage({
    params,
}: Props) {

    const {
        category,
        subcategory,
    } = await params;

    const articles =
        await getArticlesBySubcategory(
            category,
            subcategory
        );

    if (articles.length === 0) {
        notFound();
    }

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

                        <Link
                            href={`/${category}`}
                            className="transition hover:text-black"
                        >
                            {getCategoryName(category)}
                        </Link>

                        <span>/</span>

                        <span className="font-medium text-neutral-900">
                            {getSubcategoryName(
                                category,
                                subcategory
                            )}
                        </span>

                    </nav>

                    <div className="mt-12">

                        <NewsFeed
                            articles={articles}
                        />

                    </div>

                </div>

            </main>

            <Footer />

        </>
    );
}