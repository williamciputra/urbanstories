import { articles } from "../data/articles";
import NewsFeedCard from "./NewsFeedCard";

type Article = (typeof articles)[number];

interface NewsFeedProps {
  articles: Article[];
}

export default function NewsFeed({
  articles,
}: NewsFeedProps) {
  return (
    <>
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

      <nav className="mt-10 flex items-center justify-center gap-8 text-sm">

        <button
          disabled
          className="cursor-not-allowed text-neutral-400"
        >
          Previous
        </button>

        <span className="font-semibold text-black">
          1
        </span>

        <button
          disabled
          className="cursor-not-allowed text-neutral-400"
        >
          Next
        </button>

      </nav>
    </>
  );
}