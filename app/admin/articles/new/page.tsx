import NewArticleForm from "@/components/admin/articles/NewArticleForm";

export default function NewArticlePage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">New Article</h1>

        <p className="mt-2 text-gray-500">
          Create a new article for Urbanstories.
        </p>
      </div>

      <NewArticleForm />
    </main>
  );
}