import HeadlineCard from "../cards/HeadlineCard";

import type { HomepageArticle } from "@/services/public/articles";

type HeadlineSectionProps = {
  articles: HomepageArticle[];
};

export default function HeadlineSection({
  articles,
}: HeadlineSectionProps) {
  if (!articles.length) return null;

  return (
    <section className="mt-6">

      <div className="mb-4 border-b border-neutral-200 pb-3">

        <h2 className="text-[22px] font-bold tracking-[-0.02em] text-neutral-900">
          Latest Headlines
        </h2>

      </div>

      <div className="grid grid-cols-4 gap-6">

        {articles.slice(0, 4).map((article) => (
          <HeadlineCard
            key={article.id}
            article={article}
          />
        ))}

      </div>

    </section>
  );
}