import { articles } from "../data/articles";
import NewsFeedCard from "./NewsFeedCard";

export default function LatestArticles() {
  const latestArticles = articles.filter(
    (article) => !article.hero && !article.editorPick
  );

  return (
    <section className="mt-28">
      <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
        Latest Articles
      </h2>

      <div className="mt-6 border-b border-black"></div>

      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-[720px] rounded-sm border border-neutral-200 bg-white">
          {latestArticles.map((article) => (
            <NewsFeedCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-2">

        <button className="rounded bg-black px-4 py-2 text-sm text-white">
          1
        </button>

        <button className="rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:border-black hover:bg-neutral-50">
          2
        </button>

        <button className="rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:border-black hover:bg-neutral-50">
          3
        </button>

        <span className="px-2 text-neutral-400">
          …
        </span>

        <button className="rounded border border-neutral-300 px-4 py-2 text-sm text-neutral-700 transition hover:border-black hover:bg-neutral-50">
          Next →
        </button>

      </div>
    </section>
  );
}