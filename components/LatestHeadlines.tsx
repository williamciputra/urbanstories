import EditorsCard from "./EditorsCard";

import type { HomepageArticle } from "@/services/public/articles";

type LatestHeadlinesProps = {
  articles: HomepageArticle[];
};

export default function LatestHeadlines({
  articles,
}: LatestHeadlinesProps) {
  if (!articles.length) return null;

  return (
    <section className="h-full">
      <h2 className="text-2xl font-semibold text-neutral-900">
        LATEST HEADLINES
      </h2>

      <div className="mt-2 mb-2 border-b border-neutral-300"></div>

      <div className="space-y-1">
        {articles.map((article) => (
          <EditorsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}