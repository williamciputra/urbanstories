import { getLatestHeadlines } from "@/services/public/articles";
import EditorsCard from "./EditorsCard";

export default async function LatestHeadlines() {
  const headlines = await getLatestHeadlines();

  if (!headlines.length) return null;

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