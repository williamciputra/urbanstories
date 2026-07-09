import type { HomepageArticle } from "@/services/public/articles";

import NewsFeedCard from "./NewsFeedCard";

type NewsFeedProps = {
  articles: HomepageArticle[];
};

export default function NewsFeed({
  articles,
}: NewsFeedProps) {
  return (
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
  );
}