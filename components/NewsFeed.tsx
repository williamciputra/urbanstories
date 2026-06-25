import { articles } from "../data/articles";
import NewsFeedCard from "./NewsFeedCard";

export default function NewsFeed() {
  const latestArticles = articles.filter(
    (article) => !article.hero && !article.editorPick
  );

  return (
    <section className="mt-28">
      <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
        Latest Articles
      </h2>

      <div className="border-b border-black mt-6 mb-12"></div>

      <div className="space-y-12">
        {latestArticles.map((article) => (
          <NewsFeedCard
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </section>
  );
}