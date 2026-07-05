export async function deleteArticle(
  id: string
) {
  const confirmed = window.confirm(
    "Delete this article?"
  );

  if (!confirmed) return;

  const res = await fetch(
    `/api/articles/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    const error = await res.json();

    throw new Error(
      error.error ??
        "Failed to delete article."
    );
  }

  return res.json();
}