import { articles } from "../data/articles";
import EditorsCard from "./EditorsCard";

export default function LatestHeadlines() {
  const headlines = articles
    .filter((article) => !article.hero)
    .slice(0, 4);

  if (headlines.length === 0) return null;

  return (
    <section className="h-full">
      <h2 className="text-2xl font-semibold text-neutral-900">
        LATEST HEADLINES
      </h2>

      <div className="mt-2 mb-2 border-b border-neutral-300"></div>

      <div className="space-y-1">
        {headlines.map((article) => (
          <EditorsCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}