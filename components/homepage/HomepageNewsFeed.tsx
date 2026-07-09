import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

import NewsFeedCard from "@/components/NewsFeedCard";

type HomepageNewsFeedProps = {
  articles: HomepageArticle[];

  currentPage: number;
  totalPages: number;
};

export default function HomepageNewsFeed({
  articles,
  currentPage,
  totalPages,
}: HomepageNewsFeedProps) {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[720px] rounded-sm border border-neutral-200 bg-white">
          {articles.map((article) => (
            <NewsFeedCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>

      <nav className="mt-10 flex items-center justify-center gap-8 text-sm">
        {currentPage > 1 ? (
          <Link
            href={
              currentPage === 2
                ? "/"
                : `/latest/${currentPage - 1}`
            }
            className="text-neutral-700 transition hover:text-black"
          >
            Previous
          </Link>
        ) : (
          <span className="cursor-not-allowed text-neutral-400">
            Previous
          </span>
        )}

        <span className="font-semibold text-black">
          {currentPage}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={`/latest/${currentPage + 1}`}
            className="text-neutral-700 transition hover:text-black"
          >
            Next
          </Link>
        ) : (
          <span className="cursor-not-allowed text-neutral-400">
            Next
          </span>
        )}
      </nav>
    </>
  );
}