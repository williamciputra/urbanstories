"use client";

import { useMemo, useState } from "react";

import type { HomepageArticle } from "@/services/public/articles";

import NewsFeedCard from "./NewsFeedCard";

interface IndexFeedProps {
  articles: HomepageArticle[];
}

export default function IndexFeed({
  articles,
}: IndexFeedProps) {
  const latestDate = [...articles]
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() -
        new Date(a.published_at).getTime()
    )[0]?.published_at.slice(0, 10);

  const [selectedDate, setSelectedDate] =
    useState(latestDate ?? "");

  const filteredArticles = useMemo(() => {
    return [...articles]
      .filter(
        (article) =>
          article.published_at.slice(0, 10) ===
          selectedDate
      )
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
  }, [articles, selectedDate]);

  return (
    <div className="max-w-[720px]">

      <div className="mb-10">

        <label
          htmlFor="index-date"
          className="mb-3 block text-sm font-medium text-neutral-700"
        >
          Pilih Tanggal
        </label>

        <input
          id="index-date"
          type="date"
          value={selectedDate}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
          className="w-full rounded-sm border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-black"
        />

      </div>

      <div className="rounded-sm border border-neutral-200 bg-white">

        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <NewsFeedCard
              key={article.id}
              article={article}
            />
          ))
        ) : (
          <div className="py-20 text-center">

            <h2 className="text-xl font-semibold text-neutral-900">
              Tidak ada artikel
            </h2>

            <p className="mt-2 text-neutral-500">
              Belum ada artikel yang dipublikasikan
              pada tanggal tersebut.
            </p>

          </div>
        )}

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

    </div>
  );
}