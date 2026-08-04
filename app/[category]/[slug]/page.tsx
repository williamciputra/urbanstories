import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticleBySlug } from "@/services/public/articles";
import { getArticlePageFeed } from "@/services/public/homepage-v2";

import ReadingProgress from "@/components/ReadingProgress";
import ArticleSchema from "@/components/seo/ArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import ArticlePageV2 from "@/components/v2/article/ArticlePage";

const SITE_URL = "https://urbanstories.id";

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/${article.subcategories?.slug ??
    article.categories?.name.toLowerCase()
    }/${article.slug}`;

  const image =
    article.media?.path ??
    `${SITE_URL}/opengraph-image.png`;

  return {
    title: article.title,

    description: article.excerpt,

    authors: [
      {
        name:
          article.authors?.name ??
          "Urbanstories",
      },
    ],

    creator: "Urbanstories",

    publisher: "Urbanstories",

    category:
      article.categories?.name,

    robots: {
      index: true,
      follow: true,
    },

    keywords:
      article.tags?.map(
        (tag) => tag.name
      ) ?? [],

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      type: "article",

      url: articleUrl,

      siteName: "Urbanstories",

      locale: "id_ID",

      title: article.title,

      description: article.excerpt,

      publishedTime:
        article.published_at,

      authors: article.authors?.name
        ? [article.authors.name]
        : [],

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: article.title,

      description: article.excerpt,

      images: [image],
    },
  };
}

export default async function ArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const article =
    await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const feed =
    await getArticlePageFeed(article);

  const breadcrumbs = [
    {
      name: "Home",
      url: SITE_URL,
    },
    {
      name:
        article.categories?.name ?? "",
      url: `${SITE_URL}/${article.categories?.name.toLowerCase()}`,
    },
    {
      name: article.title,
      url: articleUrl(article),
    },
  ];

  return (
    <>
      <ArticleSchema article={article} />

      <BreadcrumbSchema
        items={breadcrumbs}
      />

      <ReadingProgress />

      <ArticlePageV2
        feed={feed}
      />
    </>
  );
}

function articleUrl(
  article: Awaited<
    ReturnType<typeof getArticleBySlug>
  >
) {
  return `${SITE_URL}/${article?.subcategories?.slug ??
    article?.categories?.name.toLowerCase()
    }/${article?.slug}`;
}