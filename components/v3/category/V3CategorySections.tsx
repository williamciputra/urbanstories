import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { SUBCATEGORY_SLUGS } from "@/lib/taxonomy/subcategories";
import V3ArticleGrid from "./V3ArticleGrid";

type Props = {
  category: string;
  articles: HomepageArticle[];
};

export default function V3CategorySections({ category, articles }: Props) {
  const subcategories =
    SUBCATEGORY_SLUGS[
      category as keyof typeof SUBCATEGORY_SLUGS
    ];

  const sections = Object.entries(subcategories ?? {})
    .map(([slug, name]) => ({
      slug,
      name,
      articles: articles
        .filter((article) => article.subcategories?.slug === slug)
        .slice(0, 8),
    }))
    .filter((section) => section.articles.length > 0);

  if (sections.length === 0) {
    return <V3ArticleGrid articles={articles} />;
  }

  return (
    <div className="vstack gap-4 lg:gap-6">
      {sections.map((section) => (
        <section
          key={section.slug}
          className="block-layout grid-layout vstack gap-3 lg:gap-4 panel overflow-hidden"
        >
          <div className="block-header panel border-top pt-1">
            <h2 className="h4 xl:h3 -ls-1 xl:-ls-2 m-0 text-inherit hstack gap-1">
              <span
                aria-hidden="true"
                className="panel d-inline-block bg-primary w-8px h-8px translate-y-px"
              />
              <span>{section.name}</span>
            </h2>
          </div>

          <div className="block-content">
            <V3ArticleGrid articles={section.articles} />
          </div>

          <div className="block-footer cstack lg:mt-2">
            <Link
              href={`/category/${category}/${section.slug}`}
              className="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto"
            >
              <span>See all {section.name}</span>
              <i className="icon icon-1 unicon-chevron-right" />
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
