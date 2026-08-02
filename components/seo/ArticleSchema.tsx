import type { PublicArticle } from "@/services/public/articles";

interface Props {
  article: PublicArticle & {
    updated_at?: string;
  };
}

const SITE_URL = "https://urbanstories.id";

export default function ArticleSchema({
  article,
}: Props) {
  const image =
    article.media?.path ??
    `${SITE_URL}/opengraph-image.png`;

  const articleUrl = `${SITE_URL}/${article.subcategories?.slug ??
    article.categories?.name.toLowerCase()
    }/${article.slug}`;

  const schema = {
    "@context": "https://schema.org",

    "@type": "NewsArticle",

    "@id": `${articleUrl}#article`,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    url: articleUrl,

    headline: article.title,

    description: article.excerpt,

    image: [image],

    inLanguage: "id-ID",

    datePublished: article.published_at,

    dateModified:
      article.updated_at ??
      article.published_at,

    author: {
      "@type": "Person",
      name:
        article.authors?.name ??
        "Urbanstories",
    },

    publisher: {
      "@id":
        "https://urbanstories.id/#organization",
    },

    articleSection:
      article.categories?.name,

    keywords:
      article.tags
        ?.map((tag) => tag.name)
        .join(", ") ?? undefined,

    wordCount:
      article.content
        ?.split(/\s+/)
        .length,

    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}