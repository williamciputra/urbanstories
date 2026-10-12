import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type Props = {
  articles: HomepageArticle[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function V3ArticleGrid({ articles }: Props) {
  return (
    <div className="row child-cols-12 sm:child-cols-6 md:child-cols-4 lg:child-cols-3 g-2 gy-4 md:g-3 md:gy-5 xl:g-4 xl:gy-6">
      {articles.map((article) => (
        <div key={article.id}>
          <article className="post type-post panel vstack gap-1 lg:gap-2">
            <div className="post-media panel uc-transition-toggle overflow-hidden">
              <div className="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                {article.media?.path && (
                  <Image
                    src={article.media.path}
                    alt={article.media.alt_text ?? article.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    className="media-cover image uc-transition-scale-up uc-transition-opaque"
                  />
                )}
              </div>
              <Link
                href={getArticlePath(article)}
                className="position-cover"
                aria-label={article.title}
              />
            </div>

            <div className="post-header panel vstack gap-1">
              <div className="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                <div>
                  <div className="post-category hstack gap-narrow fw-medium">
                    <span className="text-primary dark:text-white">
                      {article.subcategories?.name ??
                        article.categories?.name ??
                        "News"}
                    </span>
                  </div>
                </div>

                <div className="sep d-none md:d-block">❘</div>

                <div className="d-none md:d-block">
                  <div className="post-date hstack gap-narrow">
                    <span>{formatDate(article.published_at)}</span>
                  </div>
                </div>
              </div>

              <h3 className="post-title h6 lg:h5 m-0 text-truncate-2">
                <Link
                  className="text-none hover:text-primary duration-150"
                  href={getArticlePath(article)}
                >
                  {article.title}
                </Link>
              </h3>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
