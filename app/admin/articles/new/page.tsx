import NewArticleForm from "@/components/admin/articles/NewArticleForm";

export default function NewArticlePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-8 py-5">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">
          New Article
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Create a new article for Urbanstories.
        </p>
      </div>

      <NewArticleForm />
    </main>
  );
}