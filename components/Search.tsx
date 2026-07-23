"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchResult = {
  id: string;
  title: string;
  slug: string;

  authors: {
    name: string;
  } | null;

  categories: {
    name: string;
  } | null;
};

interface SearchProps {
  compact?: boolean;
}

export default function Search({
  compact = false,
}: SearchProps) {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const [results, setResults] =
    useState<SearchResult[]>([]);

  const hasKeyword = keyword.trim().length > 0;

  const displayedResults = hasKeyword
    ? results
    : [];

  useEffect(() => {
    if (!hasKeyword) {
      return;
    }

    const controller =
      new AbortController();

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(
            keyword
          )}`,
          {
            signal: controller.signal,
          }
        );

        const data = await res.json();

        setResults(data);
      } catch {}
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [keyword, hasKeyword]);

  function handleSearch() {
    const value = keyword.trim();

    if (!value) return;

    router.push(
      `/search?q=${encodeURIComponent(
        value
      )}`
    );

    setKeyword("");
  }

  return (
    <div
      className={`relative transition-all duration-300 ${
        compact ? "w-64" : "w-80"
      }`}
    >
      <input
        type="text"
        placeholder="Cari artikel..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }

          if (e.key === "Escape") {
            setKeyword("");
          }
        }}
        className={`w-full rounded-full border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-300 focus:border-black ${
          compact
            ? "h-10 px-4 text-sm"
            : "h-12 px-5 text-sm"
        }`}
      />

      {displayedResults.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {displayedResults.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              onClick={() =>
                setKeyword("")
              }
              className="block border-b border-neutral-100 px-5 py-4 hover:bg-neutral-50 last:border-b-0"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {article.categories?.name}
              </p>

              <h3 className="mt-1 font-semibold text-neutral-900">
                {article.title}
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Oleh{" "}
                {article.authors?.name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}