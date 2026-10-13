import Link from "next/link";
import type { HomepageArticle } from "@/services/public/articles";

type RelatedSectionProps = {
  articles: HomepageArticle[];
};

function formatDate(value: string) {
  const date = new Date(value);
  const now = new Date();
  const days = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (days <= 0) return "Today";
  if (days === 1) return "1d ago";
  if (days < 30) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export default function RelatedSection({ articles }: RelatedSectionProps) {
  if (articles.length === 0) return null;

  return (
    <section className="section panel overflow-hidden">
      <div className="section-outer panel pt-0 pb-2 lg:pt-0 lg:pb-3">
        <div className="mb-3 lg:mb-4">
          <h2
            className="mb-3 flex items-center gap-2 font-bold leading-tight tracking-tight text-neutral-900"
            style={{ fontSize: "20px" }}
          >
            <span className="inline-block h-2 w-2 shrink-0 bg-[#D71920]" />
            Related articles
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {articles.slice(0, 4).map((article) => {
            const category = article.subcategories?.name || article.categories?.name || "Berita";
            const categorySlug = article.subcategories?.slug || "news";
            const href = `/${categorySlug}/${article.slug}`;
            const image =
              article.media?.path ||
              "/news5/assets/images/common/img-fallback.png";

            return (
              <article
                key={article.id}
                className="post type-post panel vstack gap-1"
              >
                <div className="post-media panel overflow-hidden">
                  <div className="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                    <img
                      className="media-cover image"
                      src={image}
                      alt={article.media?.alt_text || article.title}
                      loading="lazy"
                    />
                  </div>
                  <Link
                    href={href}
                    className="position-cover"
                    aria-label={article.title}
                  />
                </div>

                <div className="post-header panel vstack gap-narrow">
                  <div className="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 z-1">
                    <div>
                      <div className="post-category hstack gap-narrow fw-medium">
                        <Link
                          href={`/category/${categorySlug}`}
                          className="text-none text-primary dark:text-white"
                        >
                          {category}
                        </Link>
                      </div>
                    </div>

                    <div className="sep">❘</div>

                    <div>
                      <div className="post-date hstack gap-narrow">
                        <span>{formatDate(article.published_at)}</span>
                      </div>
                    </div>

                    <div className="cstack w-16px h-16px ms-narrow d-none md:d-inline-flex position-absolute top-0 end-0">
                      <a
                        href="#"
                        className="uc-bookmark-toggle w-16px h-16px text-none"
                        data-uc-tooltip="Add to bookmark"
                        aria-label="Add to bookmark"
                      >
                        <i className="icon-narrow unicon-bookmark-add" />
                      </a>
                    </div>
                  </div>

                  <h3 className="post-title h6 m-0 text-truncate-2">
                    <Link
                      href={href}
                      className="text-none hover:text-primary duration-150"
                    >
                      {article.title}
                    </Link>
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
