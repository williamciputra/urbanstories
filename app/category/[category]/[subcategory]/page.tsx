import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { V3Header as Header } from "@/components/v3/shared/V3Chrome";
import { V3Footer as Footer } from "@/components/v3/shared/V3Chrome";
import V3SubcategoryArticleList from "@/components/v3/category/V3SubcategoryArticleList";

import {
    getSubcategoryArticlePage,
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

    const { articles, hasMore } =
        await getSubcategoryArticlePage(
            category,
            subcategory,
            1,
            20
        );

    if (articles.length === 0) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-white">
                <div className="mx-auto max-w-7xl px-5 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
                    <div className="mb-6">
            <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#D71920] lg:gap-2 lg:text-[13px] lg:font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-neutral-900"
              >
                Home
              </Link>

              <span className="mx-1.5">›</span>

              <Link
                href={`/${category}`}
                className="transition-colors hover:text-neutral-900"
              >
                {getCategoryName(category)}
              </Link>

              <span className="mx-1.5">›</span>

              <span>{getSubcategoryName(category, subcategory)}</span>
            </nav>
          </div>

                    <header className="mb-7 mt-0 flex items-center gap-3">
                        <span
                            aria-hidden="true"
                            className="panel d-inline-block bg-primary w-8px h-8px translate-y-px"
                        />
                        <h1 className="h4 xl:h3 -ls-1 xl:-ls-2 m-0 text-inherit">
                            {getSubcategoryName(category, subcategory)}
                        </h1>
                    </header>

                    <V3SubcategoryArticleList
                            articles={articles}
                            categorySlug={category}
                            subcategorySlug={subcategory}
                            initialHasMore={hasMore}
                        />
                </div>
            </main>

            <Footer />
        </>
    );
}