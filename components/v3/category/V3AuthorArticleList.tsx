"use client";

import { useState } from "react";

import type { HomepageArticle } from "@/services/public/articles";
import V3ArticleGrid from "@/components/v3/category/V3ArticleGrid";

type Props = {
  articles: HomepageArticle[];
};

const PAGE_SIZE = 20;

export default function V3AuthorArticleList({ articles }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <div>
      <V3ArticleGrid articles={visibleArticles} />

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((current) =>
                Math.min(current + PAGE_SIZE, articles.length)
              )
            }
            className="btn btn-md btn-primary"
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
}
