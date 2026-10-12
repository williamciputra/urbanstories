import { getSubcategoryArticlePage } from "@/services/public/articles";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") ?? "";
  const subcategory = url.searchParams.get("subcategory") ?? "";
  const page = Number(url.searchParams.get("page") ?? "2");

  if (
    !category ||
    !subcategory ||
    !Number.isSafeInteger(page) ||
    page < 2
  ) {
    return Response.json({ error: "Invalid pagination parameters" }, { status: 400 });
  }

  try {
    const result = await getSubcategoryArticlePage(
      category,
      subcategory,
      page,
      20
    );

    if (result.articles.length === 0) {
      return Response.json(
        { articles: [], hasMore: false },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    return Response.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("V3 subcategory pagination failed:", error);
    return Response.json(
      { error: "Unable to load more subcategory articles" },
      { status: 500 }
    );
  }
}
