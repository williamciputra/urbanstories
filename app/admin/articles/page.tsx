export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>

        <button className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
          + New Article
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-gray-500">
        No articles yet.
      </div>
    </main>
  );
}