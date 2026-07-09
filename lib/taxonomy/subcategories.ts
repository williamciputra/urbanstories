export const SUBCATEGORY_SLUGS = {
  news: {
    nasional: "Nasional",
    internasional: "Internasional",
    ekonomi: "Ekonomi",
  },

  lifestyle: {
    kesehatan: "Kesehatan",
    parasayu: "Parasayu",
    travel: "Travel",
    fashion: "Fashion",
    kuliner: "Kuliner",
  },

  entertainment: {
    film: "Film",
    musik: "Musik",
    "hot-issue": "Hot Issue",
    "pop-art": "Pop Art",
  },

  technology: {
    gadgets: "Gadgets",
    apps: "Apps",
    ai: "AI",
  },

  explore: {
    horoscope: "Horoscope",
    intimacy: "Intimacy",
    leksikon: "Leksikon",
    horror: "Horror",
  },

  sports: {},
} as const;

export function getSubcategoryName(
  categorySlug: string,
  subcategorySlug: string
) {
  const category =
    SUBCATEGORY_SLUGS[
      categorySlug as keyof typeof SUBCATEGORY_SLUGS
    ];

  if (!category) {
    return null;
  }

  return (
    category[
      subcategorySlug as keyof typeof category
    ] ?? null
  );
}