import { articles } from "../data/articles";
import StoryCard from "./StoryCard";

export default function LatestStories() {
  const latestStories = articles.filter(
    (article) => !article.hero && !article.editorPick
  );

  return (
    <section className="mt-24">
      <h2 className="text-4xl font-semibold">Latest Stories</h2>

      <div className="border-b border-black mt-4 mb-10"></div>

      <div className="grid md:grid-cols-3 gap-10">
        {latestStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}