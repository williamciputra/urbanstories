import type { PublicArticle } from "@/services/public/articles";

interface Props {
  article: PublicArticle;
}

export default function ArticleSchema({
  article,
}: Props) {
  const image =
    article.media?.path;

  const schema = {
    "@context": "https://schema.org",

    "@type": "NewsArticle",

    headline: article.title,

    description: article.excerpt,

    image: image ? [image] : [],

    datePublished: article.published_at,

    dateModified: article.published_at,

    author: {
      "@type": "Person",

      name: article.authors?.name ?? "Urbanstories",
    },

    publisher: {
      "@type": "Organization",

      name: "Urbanstories",

      logo: {
        "@type": "ImageObject",

        url: "https://urbanstories.id/icon-512.png",
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": `https://urbanstories.id/articles/${article.slug}`,
    },
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