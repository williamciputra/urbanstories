"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { articles } from "../data/articles";

interface SearchProps {
  compact?: boolean;
}

export default function Search({
  compact = false,
}: SearchProps) {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    if (!keyword.trim()) return [];

    return articles.filter((article) =>
      [
        article.title,
        article.excerpt,
        article.category,
        article.author,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  }, [keyword]);

  const handleSearch = () => {
    const value = keyword.trim();

    if (!value) return;

    router.push(`/search?q=${encodeURIComponent(value)}`);
    setKeyword("");
  };

  return (
    <div
      className={`relative w-full transition-all duration-300 ${
        compact ? "max-w-xs" : "max-w-sm"
      }`}
    >
      <input
        type="text"
        placeholder="Cari artikel..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }

          if (e.key === "Escape") {
            setKeyword("");
          }
        }}
        className={`w-full rounded-full border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-black ${
          compact ? "h-10 px-4 text-sm" : "h-12 px-5 text-sm"
        }`}
      />

      {keyword.trim() && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {results.slice(0, 5).map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              onClick={() => setKeyword("")}
              className="block border-b border-neutral-100 px-5 py-4 hover:bg-neutral-50 last:border-b-0"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {article.category}
              </p>

              <h3 className="mt-1 font-semibold text-neutral-900">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}