import { permanentRedirect, notFound } from "next/navigation";

import {
  getArticleBySlug,
} from "@/services/public/articles";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function RedirectArticle({
  params,
}: Props) {
  const { slug } = await params;

  const article =
    await getArticleBySlug(slug);

  if (
    !article ||
    !article.subcategories
  ) {
    notFound();
  }

  permanentRedirect(
    `/${article.subcategories.slug}/${article.slug}`
  );
}