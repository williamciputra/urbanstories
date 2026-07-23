"use client";

import { useState } from "react";

import type { HomepageArticle } from "@/services/public/articles";

import LatestArticleCard from "../cards/LatestArticleCard";

type LatestFeedProps = {
    initialArticles: HomepageArticle[];
    currentPage: number;
    totalPages: number;
};

export default function LatestFeed({
    initialArticles,
    currentPage: initialPage,
    totalPages,
}: LatestFeedProps) {

    const [articles, setArticles] = useState(initialArticles);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);

    const hasMore = page < totalPages;

    async function loadMore() {

        if (loading || !hasMore) return;

        setLoading(true);

        try {

            const res = await fetch(
                `/api/homepage/latest?page=${page + 1}`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch latest articles");
            }

            const data = await res.json();

            setArticles((prev) => [
                ...prev,
                ...data.articles,
            ]);

            setPage(data.currentPage);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div>

            <div className="grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">

                {articles.map((article) => (

                    <LatestArticleCard
                        key={article.id}
                        article={article}
                    />

                ))}

            </div>

            {hasMore && (

                <div className="mt-2 flex justify-center lg:mt-12">

                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="rounded-full border border-neutral-900 bg-white px-3 py-1.5 text-[10px] font-semibold text-neutral-900 transition-colors duration-200 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 lg:px-8 lg:py-3 lg:text-sm"
                    >

                        {loading
                            ? "Loading..."
                            : "Load More"}

                    </button>

                </div>

            )}

        </div>

    );

}