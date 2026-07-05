"use client";

import { useEffect, useState } from "react";

type Article = {
  id: string;
  title: string;
};

type ArticlePickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (article: Article) => void;
};

export default function ArticlePickerModal({
  open,
  onClose,
  onSelect,
}: ArticlePickerModalProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!open) return;

    async function loadArticles() {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();

        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, [open]);

  if (!open) return null;

  const filtered = articles.filter((article) =>
    article.title
      .toLowerCase()
      .includes(keyword.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Baca Juga
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-6">

          <input
            type="text"
            placeholder="Cari artikel..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
          />

          <div className="max-h-[500px] overflow-y-auto">

            {loading ? (
              <p className="text-gray-500">
                Loading...
              </p>
            ) : filtered.length === 0 ? (
              <p className="text-gray-500">
                Artikel tidak ditemukan.
              </p>
            ) : (
              <div className="space-y-2">

                {filtered.map((article) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => {
                      onSelect(article);
                      onClose();
                    }}
                    className="w-full rounded-lg border border-gray-200 p-4 text-left transition hover:border-black"
                  >
                    {article.title}
                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}