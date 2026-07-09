import type { HomepageArticle } from "@/services/public/articles";

import HomepageNewsFeed from "@/components/homepage/HomepageNewsFeed";

type LatestArticlesProps = {
  articles: HomepageArticle[];

  currentPage: number;
  totalPages: number;
};

export default function LatestArticles({
  articles,
  currentPage,
  totalPages,
}: LatestArticlesProps) {
  if (!articles.length) {
    return null;
  }

  return (
    <section className="mt-28">
      <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
        Latest Articles
      </h2>

      <div className="mt-6 border-b border-black"></div>

      <div className="mt-12">
        <HomepageNewsFeed
          articles={articles}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </section>
  );
}