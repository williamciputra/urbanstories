import { getLatestArticles } from "@/services/public/articles";
import NewsFeed from "./NewsFeed";

export default async function LatestArticles() {
  const latestArticles =
    await getLatestArticles();

  if (!latestArticles.length) {
    return null;
  }

  return (
    <section className="mt-28">
      <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
        Latest Articles
      </h2>

      <div className="mt-6 border-b border-black"></div>

      <div className="mt-12">
        <NewsFeed
          articles={latestArticles}
        />
      </div>
    </section>
  );
}