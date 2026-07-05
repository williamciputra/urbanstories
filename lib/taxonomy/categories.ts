export const CATEGORY_SLUGS = {
  news: "News",
  lifestyle: "Lifestyle",
  entertainment: "Entertainment",
  technology: "Technology",
  sports: "Sports",
  explore: "Explore",
} as const;

export type CategorySlug =
  keyof typeof CATEGORY_SLUGS;

export function getCategoryName(
  slug: string
) {
  return (
    CATEGORY_SLUGS[
      slug as CategorySlug
    ] ?? null
  );
}