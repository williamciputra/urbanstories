import { articles } from "../data/articles";
import EditorsCard from "./EditorsCard";

export default function EditorsPick() {
  const picks = articles.filter((article) => article.editorPick);

  if (picks.length === 0) return null;

  return (
    <section className="mt-28">
      <h2 className="text-5xl font-semibold tracking-tight text-neutral-900">
        Editor&apos;s Pick
      </h2>

      <div className="border-b border-black mt-6 mb-12"></div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
        <EditorsCard
          article={picks[0]}
          featured={true}
        />

        <div className="space-y-8">
          {picks.slice(1).map((article) => (
            <EditorsCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
    </section>
  );
}