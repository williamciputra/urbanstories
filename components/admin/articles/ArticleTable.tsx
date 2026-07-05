"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteArticle } from "@/services/deleteArticle";

type Article = {
  id: string;
  title: string;
  status: string;
  updated_at: string;

  authors: any;
  categories: any;
};

type Props = {
  articles: Article[];
};

export default function ArticleTable({
  articles,
}: Props) {
  const router = useRouter();

  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((article) =>
      article.title
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );
  }, [articles, keyword]);

  async function handleDelete(id: string) {
    try {
      await deleteArticle(id);

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete article.");
      }
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search article..."
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3"
      />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-gray-900">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Title
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Author
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-left">
                Updated
              </th>

              <th className="px-6 py-4 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((article) => (
                <tr
                  key={article.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4">
                    {article.title}
                  </td>

                  <td className="px-6 py-4">
                    {(article.categories as any)?.name ??
                      "-"}
                  </td>

                  <td className="px-6 py-4">
                    {(article.authors as any)?.name ??
                      "-"}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {article.status}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      article.updated_at
                    ).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/articles/${article.id}`}
                        className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                      >
                        Edit
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(article.id)
                        }
                        className="rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}