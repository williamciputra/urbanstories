import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function ArticlesPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select(`
    id,
    title,
    slug,
    status,
    updated_at,
    authors(name),
    categories(name)
  `)
    .order("updated_at", {
      ascending: false,
    });

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Articles
        </h1>

        <Link
          href="/admin/articles/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          + New Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-gray-900">
          <thead className="border-b bg-gray-50 text-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Author
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Updated
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-gray-900">
            {articles?.length ? (
              articles.map((article) => (
                <tr
                  key={article.id}
                  className="border-b last:border-0"
                >
                  <td className="px-6 py-4">
                    {article.title || (
                      <span className="italic text-gray-400">
                        Untitled
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {article.categories?.[0]?.name ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    {article.authors?.[0]?.name ?? "-"}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {article.status}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {new Date(
                      article.updated_at
                    ).toLocaleDateString("id-ID")}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No articles yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}