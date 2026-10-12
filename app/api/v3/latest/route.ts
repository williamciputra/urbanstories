import { getHomepageFeedFromArticles } from "@/services/public/homepage-v2";
import { getHomepageSource } from "@/services/public/wordpress/articles";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") ?? "0");
    const limit = 20;

    if (!Number.isSafeInteger(offset) || offset < 0) {
      return Response.json(
        { error: "Invalid offset" },
        { status: 400 }
      );
    }

    const articles = await getHomepageSource();
    const feed = getHomepageFeedFromArticles(articles);
    const usedIds = new Set<string>();

    [
      ...(feed.topStory ? [feed.topStory] : []),
      ...feed.latestHeadlines,
      ...feed.lifestyle,
      ...feed.explore,
      ...feed.entertainment,
      ...feed.parasayu,
      ...feed.kesehatan,
    ].forEach((article) => usedIds.add(article.id));

    const latest = articles.filter(
      (article) => !usedIds.has(article.id)
    );

    const items = latest.slice(offset, offset + limit).map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      published_at: article.published_at,
      image: article.media?.path ?? null,
      category: article.subcategories?.name || article.categories?.name || "Berita",
      categorySlug: article.subcategories?.slug || "news",
    }));

    return Response.json(
      {
        items,
        nextOffset: offset + items.length,
        hasMore: offset + items.length < latest.length,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("V3 Latest News pagination failed:", error);

    return Response.json(
      { error: "Unable to load more articles" },
      { status: 500 }
    );
  }
}
