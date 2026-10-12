"use client";

import { useState } from "react";

import type { HomepageArticle } from "@/services/public/articles";
import V3ArticleGrid from "@/components/v3/category/V3ArticleGrid";

type Props = {
  articles: HomepageArticle[];
  categorySlug: string;
  subcategorySlug: string;
  initialHasMore: boolean;
};

export default function V3SubcategoryArticleList({
  articles: initialArticles,
  categorySlug,
  subcategorySlug,
  initialHasMore,
}: Props) {
  const [articles, setArticles] = useState(initialArticles);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMore() {
    if (loading || !hasMore) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        category: categorySlug,
        subcategory: subcategorySlug,
        page: String(page + 1),
      });

      const response = await fetch(`/api/v3/subcategory?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Gagal memuat artikel berikutnya.");
      }

      const result = (await response.json()) as {
        articles: HomepageArticle[];
        hasMore: boolean;
      };

      setArticles((current) => {
        const existingIds = new Set(current.map((article) => article.id));
        return [
          ...current,
          ...result.articles.filter((article) => !existingIds.has(article.id)),
        ];
      });
      setPage((current) => current + 1);
      setHasMore(result.hasMore);
    } catch {
      setError("Artikel berikutnya gagal dimuat. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <V3ArticleGrid articles={articles} />

      {error && (
        <p className="mt-4 text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
            className="btn btn-md btn-primary"
          >
            {loading ? "Loading..." : "See All Subcategory"}
          </button>
        </div>
      )}
    </div>
  );
}
