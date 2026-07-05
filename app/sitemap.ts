import type { MetadataRoute } from "next";

import {
  getSitemapArticles,
} from "@/services/public/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    "https://urbanstories.id";

  const articles =
    await getSitemapArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  const articlePages =
    articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.published_at,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const categories = [
    ...new Set(
      articles
        .map(
          (a) =>
            a.categories?.name
        )
        .filter(Boolean)
    ),
  ];

  const categoryPages =
    categories.map((category) => ({
      url: `${baseUrl}/${String(category).toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const authors = [
    ...new Set(
      articles
        .map(
          (a) =>
            a.authors?.name
        )
        .filter(Boolean)
    ),
  ];

  const authorPages =
    authors.map((author) => ({
      url: `${baseUrl}/author/${String(author)
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...categoryPages,
    ...authorPages,
    ...articlePages,
  ];
}