import { readFile } from "node:fs/promises";
import path from "node:path";
import { getHomepageFeed, getHomepageFeedFromArticles } from "@/services/public/homepage-v2";
import { applyUrbanstoriesChrome } from "@/services/public/v3-chrome";
import { getHomepageSource } from "@/services/public/wordpress/articles";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string | null | undefined) {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function renderHero(
  articles: NonNullable<
    Awaited<ReturnType<typeof getHomepageFeed>>["topStory"]
  >[]
) {
  const slides = articles
    .map((article) => {
      const title = escapeHtml(article.title);
      const image =
        article.media?.path ||
        "/news5/assets/images/common/img-fallback.png";
      const category = escapeHtml(
        article.subcategories?.name ||
          article.categories?.name ||
          "News"
      );
      const categorySlug = escapeHtml(
        article.subcategories?.slug ||
          article.categories?.name?.toLowerCase().replaceAll(" ", "-") ||
          ""
      );
      const author = escapeHtml(
        article.authors?.name || "Urbanstories"
      );
      const date = escapeHtml(formatDate(article.published_at));
      const href = `/${categorySlug}/${escapeHtml(article.slug)}`;

      return `
                        <div class="swiper-slide">
                            <article class="post type-post">
                                <figure hidden class="post-featured-image panel m-0">
                                    <canvas class="h-300px sm:h-400px lg:h-500px"></canvas>
                                    <img class="media-cover image" src="${escapeHtml(image)}" alt="${title}" data-uc-scrollspy="cls: uc-animation-kenburns; repeat: true">
                                    <a href="${href}" class="position-cover"></a>
                                </figure>

                                <div class="featured-image bg-gray-25 dark:bg-gray-800">
                                    <canvas class="min-h-300px lg:min-h-500px"></canvas>
                                    <img class="media-cover image" src="/news5/assets/images/common/img-fallback.png" data-src="${escapeHtml(image)}" alt="${title}" data-uc-img="loading: lazy">
                                </div>

                                <div class="d-block position-cover bg-gradient-to-r from-black to-transparent z-1 opacity-60"></div>

                                <div class="panel max-w-xl mx-auto px-2 z-3">
                                    <div class="post-header panel position-absolute bottom-0 vstack justify-between gap-2 xl:gap-4 max-w-600px mb-4 xl:mb-8">
                                        <div class="post-top hstack gap-narrow">
                                            <div class="post-category hstack gap-narrow fs-7 fw-bold h-24px px-1 rounded-1 shadow-xs bg-white text-primary">
                                                <a class="text-none" href="${categorySlug ? `/${categorySlug}` : "#"}">${category}</a>
                                            </div>
                                        </div>

                                        <h3 class="post-title h4 lg:h3 xl:h2 m-0 text-truncate-2" data-swiper-parallax="-48">
                                            <a class="text-none" href="${href}">${title}</a>
                                        </h3>

                                        <div>
                                            <div class="post-meta panel hstack justify-between fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex">
                                                <div class="meta">
                                                    <div class="hstack gap-2">
                                                        <div>
                                                            <div class="post-author hstack gap-1">
                                                                <span>By</span>
                                                                <a href="#" class="text-black dark:text-white text-none fw-bold">${author}</a>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div class="post-date hstack gap-narrow">
                                                                <span>${date}</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <a href="#" class="post-comments text-none hstack gap-narrow">
                                                                <i class="icon-narrow unicon-chat"></i>
                                                                <span>0</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="actions">
                                                    <div class="hstack gap-1"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>`;
    })
    .join("");

  const thumbs = articles
    .map((article) => {
      const title = escapeHtml(article.title);
      const date = escapeHtml(formatDate(article.published_at));

      return `
                                    <div class="swiper-slide">
                                        <article class="post type-post">
                                            <div class="post-header panel vstack justify-between gap-1 lg:gap-2">
                                                <div>
                                                    <div class="post-meta panel hstack justify-between fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex">
                                                        <div class="meta">
                                                            <div class="hstack gap-2">
                                                                <div>
                                                                    <div class="post-date hstack gap-narrow">
                                                                        <span>${date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="actions">
                                                            <div class="hstack gap-1"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 class="h6 m-0 text-truncate-2">${title}</h3>
                                            </div>
                                        </article>
                                    </div>`;
    })
    .join("");

  return `
            <div class="block-slider block-slider-miniposts panel swiper-parent uc-dark">
                <div class="swiper-main swiper" data-uc-swiper="connect: .swiper-thumbs; items: 1; autoplay: 5000; active: 0; gap: 0; dots: .swiper-pagination; disable-class: opacity-30; effect: fade; fade: true;">
                    <div class="swiper-wrapper">
${slides}
                    </div>

                    <!-- Add Arrows -->
                    <div class="swiper-navigation position-cover panel max-w-xl mx-auto px-2 mt-2 xl:mt-8">
                        <div class="hstack justify-end md:justify-start gap-1">
                            <div class="swiper-nav swiper-prev btn w-40px lg:w-48px h-40px lg:h-48px p-0 border-0 bg-white bg-opacity-30 hover:bg-primary hover:bg-opacity-100 text-white rounded-circle shadow-xs z-1">
                                <i class="unicon-chevron-left icon-1"></i>
                            </div>

                            <div class="swiper-nav swiper-next btn w-40px lg:w-48px h-40px lg:h-48px p-0 border-0 bg-white bg-opacity-30 hover:bg-primary hover:bg-opacity-100 text-white rounded-circle shadow-xs z-1">
                                <i class="unicon-chevron-right icon-1"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="position-absolute top-0 end-0 bottom-0 w-1/2 bg-gradient-to-l from-black to-transparent opacity-70 z-1 d-none lg:d-block"></div>

                <div class="slider-thumbs-wrap d-none lg:d-block">
                    <div class="container container-2xl">
                        <div class="panel">
                            <div class="swiper swiper-thumbs position-absolute end-0 bottom-0 max-h-300px max-w-300px mb-4 xl:mb-8 z-2" data-uc-swiper="items: 3; gap: 16; direction: vertical; mousewheel: true; freeMode: true;">
                                <div class="swiper-wrapper">
${thumbs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}


function renderMustRead(
  articles: Awaited<ReturnType<typeof getHomepageFeed>>["mustRead"]
) {
  const items = articles.slice(0, 4);

  if (!items.length) return "";

  const cards = items.map((article, index) => {
    const categorySlug =
      article.subcategories?.slug ||
      article.categories?.name.toLowerCase() ||
      "";

    const href =
      `/${escapeHtml(categorySlug)}/${escapeHtml(article.slug)}`;
    const image =
      article.media?.path ||
      "/news5/assets/images/common/img-fallback.png";

    return `
      <article class="post type-post panel vstack gap-1 lg:gap-2">
        <div class="post-media panel uc-transition-toggle overflow-hidden">
          <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
            <img
              class="media-cover image uc-transition-scale-up uc-transition-opaque"
              src="${escapeHtml(image)}"
              alt="${escapeHtml(article.media?.alt_text || article.title)}"
              loading="lazy"
            >
          </div>
          <a href="${href}" class="position-cover"
             aria-label="${escapeHtml(article.title)}"></a>
          <span class="position-absolute top-0 start-0 bg-primary text-inverse fw-bold px-2 py-1">
            ${index + 1}
          </span>
        </div>
        <div class="post-header panel vstack gap-1">
          <h3 class="post-title h6 m-0 text-truncate-2">
            <a class="text-none hover:text-primary duration-150"
               href="${href}">${escapeHtml(article.title)}</a>
          </h3>
          <div class="post-meta text-sm text-muted">
            ${escapeHtml(formatDate(article.published_at))}
          </div>
        </div>
      </article>`;
  }).join("\n");

  return `
    <div class="vstack gap-3">
      <div class="block-header panel border-top pt-1">
        <h2 class="h4 xl:h3 -ls-1 xl:-ls-2 m-0 text-inherit hstack gap-1">
          <span class="panel d-inline-block bg-primary w-8px h-8px translate-y-px"></span>
          <span>Must Read</span>
        </h2>
      </div>
      <div class="block-content">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:16px">
          ${cards}
        </div>
      </div>
    </div>`;
}



function renderCategorySection(
  title: string,
  slug: string,
  articles: Awaited<ReturnType<typeof getHomepageFeed>>["lifestyle"]
) {
  const items = articles.slice(0, 6);

  if (!items.length) return "";

  const articleHref = (article: (typeof items)[number]) => {
    const categorySlug =
      article.subcategories?.slug ||
      article.categories?.name?.toLowerCase().replaceAll(" ", "-") ||
      slug;

    return `/${categorySlug}/${escapeHtml(article.slug)}`;
  };

  const articleCategory = (article: (typeof items)[number]) =>
    escapeHtml(
      article.subcategories?.name ||
      article.categories?.name ||
      title
    );

  const articleCategoryHref = (article: (typeof items)[number]) => {
    if (article.subcategories?.slug) {
      const parentSlug =
        article.categories?.name?.toLowerCase().replaceAll(" ", "-") ||
        slug;

      return `/category/${escapeHtml(parentSlug)}/${escapeHtml(article.subcategories.slug)}`;
    }

    return `/category/${escapeHtml(slug)}`;
  };

  const featured = items[0];

  const supporting = items.slice(1, 6).map((article) => `
                                            <div>
                                                <article class="post type-post panel">
                                                    <div class="row child-cols g-2" data-uc-grid>
                                                        <div class="col-auto">
                                                            <div class="post-media panel uc-transition-toggle overflow-hidden max-w-150px min-w-100px lg:min-w-150px">
                                                                <div class="featured-image bg-gray-25 dark:bg-gray-800 ratio ratio-16x9">
                                                                    <img class="media-cover image uc-transition-scale-up uc-transition-opaque" src="/news5/assets/images/common/img-fallback.png" data-src="${escapeHtml(article.media?.path || "")}" alt="${escapeHtml(article.title)}" data-uc-img="loading: lazy">
                                                                </div>
                                                                <a href="${articleHref(article)}" class="position-cover"></a>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div class="post-header panel vstack justify-between gap-1">
                                                                <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                                                                    <div>
                                                                        <div class="post-category hstack gap-narrow fw-medium">
                                                                            <a class="text-none text-primary dark:text-white" href="${articleCategoryHref(article)}">${articleCategory(article)}</a>
                                                                        </div>
                                                                    </div>

                                                                    <div class="sep d-none md:d-block">❘</div>

                                                                    <div class="d-none md:d-block">
                                                                        <div class="post-date hstack gap-narrow">
                                                                            <span>${escapeHtml(formatDate(article.published_at))}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h3 class="post-title h6 lg:h5 m-0 text-truncate-2">
                                                                    <a class="text-none hover:text-primary duration-150" href="${articleHref(article)}">${escapeHtml(article.title)}</a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>`).join("");

  return `
            <div class="section panel overflow-hidden">
                <div class="section-outer panel py-2 lg:py-3">
                    <div class="container max-w-xl">
                        <div class="section-inner">
                            <div class="block-layout grid-layout vstack gap-3 lg:gap-4 panel overflow-hidden">
                                <div class="block-header panel border-top pt-1">
                                    <h2 class="h4 xl:h3 -ls-1 xl:-ls-2 m-0 text-inherit hstack gap-1">
                                        <span class="panel d-inline-block bg-primary w-8px h-8px translate-y-px"></span>
                                        <a class="text-none hover:text-primary duration-150" href="/${escapeHtml(slug)}">${escapeHtml(title)}</a>
                                    </h2>
                                </div>

                                <div class="block-content">
                                    <div class="panel row child-cols-12 md:child-cols gy-4 md:gx-3 xl:gx-4">
                                        <div class="col-12 md:col-6 lg:col-7">
                                            <div>
                                                <article class="post type-post panel vstack gap-1 lg:gap-2">
                                                    <div class="post-media panel uc-transition-toggle overflow-hidden">
                                                        <div class="featured-image bg-gray-25 dark:bg-gray-800 overflow-hidden ratio ratio-16x9">
                                                            <img class="media-cover image uc-transition-scale-up uc-transition-opaque" src="/news5/assets/images/common/img-fallback.png" data-src="${escapeHtml(featured.media?.path || "")}" alt="${escapeHtml(featured.title)}" data-uc-img="loading: lazy">
                                                        </div>
                                                        <a href="${articleHref(featured)}" class="position-cover"></a>
                                                    </div>

                                                    <div class="post-header panel vstack gap-1">
                                                        <div class="post-meta panel hstack justify-start gap-1 fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex z-1">
                                                            <div>
                                                                <div class="post-category hstack gap-narrow fw-medium">
                                                                    <a class="text-none text-primary dark:text-white" href="${articleCategoryHref(featured)}">${articleCategory(featured)}</a>
                                                                </div>
                                                            </div>

                                                            <div class="sep d-none md:d-block">❘</div>

                                                            <div class="d-none md:d-block">
                                                                <div class="post-date hstack gap-narrow">
                                                                    <span>${escapeHtml(formatDate(featured.published_at))}</span>
                                                                </div>
                                                            </div>

                                                            <div class="cstack w-16px h-16px ms-narrow d-none md:d-inline-flex position-absolute top-0 end-0">
                                                                <a href="#" class="uc-bookmark-toggle w-16px h-16px text-none" data-uc-tooltip="Add to bookmark">
                                                                    <i class="icon-narrow unicon-bookmark-add"></i>
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <h3 class="post-title h5 lg:h4 m-0 text-truncate-2">
                                                            <a class="text-none hover:text-primary duration-150" href="${articleHref(featured)}">${escapeHtml(featured.title)}</a>
                                                        </h3>

                                                        <p class="fs-6 opacity-60 text-truncate-2 my-1">${escapeHtml(featured.excerpt)}</p>

                                                        <div class="post-meta panel hstack justify-between fs-7 fw-medium text-gray-900 dark:text-white text-opacity-60 d-none md:d-flex">
                                                            <div class="meta">
                                                                <div class="hstack gap-2">
                                                                    <div>
                                                                        <div class="post-author hstack gap-1">
                                                                            <a href="${featured.authors?.name ? `/author/${escapeHtml(featured.authors.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))}` : "#"}" data-uc-tooltip="${escapeHtml(featured.authors?.name || "Urbanstories")}">
                                                                                <img src="${escapeHtml(featured.authors?.avatarUrl || "/news5/assets/images/avatars/01.png")}" alt="${escapeHtml(featured.authors?.name || "Urbanstories")}" class="w-24px h-24px rounded-circle">
                                                                            </a>
                                                                            <a href="${featured.authors?.name ? `/author/${escapeHtml(featured.authors.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))}` : "#"}" class="text-black dark:text-white text-none fw-bold">${escapeHtml(featured.authors?.name || "Urbanstories")}</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="actions">
                                                                <div class="hstack gap-1"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        </div>

                                        <div>
                                            <div class="row child-cols-12 g-4 sep-x">
${supporting}
                                            </div>

                                            <a href="/${escapeHtml(slug)}" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 mt-4">
                                                <span>See all ${escapeHtml(title)}</span>
                                                <i class="icon icon-1 unicon-chevron-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

export async function GET() {
  const templatePath = path.join(
    process.cwd(),
    "public/news5/demo-seven/index.html"
  );

  let html = await readFile(templatePath, "utf8");

  // Urbanstories V3 document title and favicon.
  html = html.replace(
    /<title[^>]*>[\s\S]*?<\/title>/i,
    "<title>Urbanstories | Cerita yang Menginspirasi</title>"
  );

  html = html.replace(
    /<link\b[^>]*rel=["'](?:shortcut icon|icon|apple-touch-icon)["'][^>]*>/gi,
    ""
  );

  html = html.replace(
    "</head>",
    `<link rel="icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
<link rel="apple-touch-icon" href="/apple-icon.png">
</head>`
  );

  html = html.replaceAll("./assets", "/news5/assets/");

  const allLatestSource = await getHomepageSource();
  const feed = getHomepageFeedFromArticles(allLatestSource);

  const heroArticles = [
    feed.topStory,
    ...feed.latestHeadlines,
  ].filter(
    (article): article is NonNullable<typeof article> =>
      article !== null
  );

  const heroStart = html.indexOf(
    '<div class="block-slider block-slider-miniposts panel swiper-parent uc-dark">'
  );

  const heroEnd = html.indexOf(
    "<!-- Section end -->",
    heroStart
  );

  if (heroStart !== -1 && heroEnd !== -1) {
    html =
      html.slice(0, heroStart) +
      renderHero(heroArticles) +
      "\n\n            " +
      html.slice(heroEnd);
  }

  // Keep the original News5 Advertisement section wrapper and replace only its content.
  const adImageIndex = html.indexOf("ad-slot.jpg");

  if (adImageIndex !== -1) {
    const adAnchorStart = html.lastIndexOf(
      '<a class="text-none"',
      adImageIndex
    );
    const adAnchorEnd = html.indexOf("</a>", adImageIndex);

    if (adAnchorStart !== -1 && adAnchorEnd !== -1) {
      html =
        html.slice(0, adAnchorStart) +
        renderMustRead(feed.mustRead) +
        html.slice(adAnchorEnd + 4);
    }
  }

  const replaceTemplateSection = (
    heading: string,
    replacement: string
  ) => {
    const headingMarker =
      `href="blog-category.html">${heading}</a>`;
    const headingIndex = html.indexOf(headingMarker);

    if (headingIndex === -1) {
      console.error(`Section template tidak ditemukan: ${heading}`);
      return;
    }

    const sectionStart = html.lastIndexOf(
      '<div class="section panel overflow-hidden">',
      headingIndex
    );
    const sectionEnd = html.indexOf(
      "<!-- Section end -->",
      headingIndex
    );

    if (sectionStart === -1 || sectionEnd === -1) {
      console.error(`Batas section tidak ditemukan: ${heading}`);
      return;
    }

    html =
      html.slice(0, sectionStart) +
      replacement +
      "\n\n            " +
      html.slice(sectionEnd);
  };

  replaceTemplateSection(
    "Technology",
    renderCategorySection("Lifestyle", "lifestyle", feed.lifestyle)
  );

  replaceTemplateSection(
    "Security",
    renderCategorySection("Explore", "explore", feed.explore)
  );

  replaceTemplateSection(
    "Business",
    renderCategorySection(
      "Entertainment",
      "entertainment",
      feed.entertainment
    )
  );






  // Replace data inside the original News5 Gadgets/Science template only.
  const twoColumnMarker = '<div class="row child-cols-12 lg:child-cols-6 g-4 gx-8" data-uc-grid>';
  const twoColumnIndex = html.indexOf(twoColumnMarker);
  const sectionStart = twoColumnIndex === -1 ? -1 : html.lastIndexOf(
    '<div class="section panel overflow-hidden">',
    twoColumnIndex
  );
  const sectionEndMarker = "<!-- Section end -->";
  const sectionEndIndex = twoColumnIndex === -1 ? -1 : html.indexOf(
    sectionEndMarker,
    twoColumnIndex
  );

  if (sectionStart !== -1 && sectionEndIndex !== -1) {
    let section = html.slice(sectionStart, sectionEndIndex);
    const articlePattern = /<article class="post type-post panel">[\s\S]*?<\/article>/g;
    const cards = [...section.matchAll(articlePattern)];

    const updateCard = (
      original: string,
      article: (typeof feed.parasayu)[number],
      sectionTitle: string,
      sectionSlug: string
    ) => {
      const esc = (value: string) => escapeHtml(value);
      const category = esc(article.subcategories?.name || article.categories?.name || sectionTitle);
      const categorySlug = article.subcategories?.slug ||
        article.categories?.name?.toLowerCase().replaceAll(" ", "-") ||
        sectionSlug;
      const href = `/${categorySlug}/${esc(article.slug)}`;
      let card = original;

      card = card.replace(/data-src="[^"]*"/, `data-src="${esc(article.media?.path || "")}"`);
      card = card.replace(/alt="[^"]*"/, `alt="${esc(article.title)}"`);

      card = card.replace(/href="blog-details\.html"/g, `href="${href}"`);
      card = card.replace(
        /href="blog-category\.html">[^<]*<\/a>/,
        `href="/category/lifestyle/${sectionSlug}">${category}</a>`
      );

      card = card.replace(
        /(<h3 class="post-title[^"]*">[\s\S]*?<a\b[^>]*>)[\s\S]*?(<\/a>)/,
        `$1${esc(article.title)}$2`
      );

      card = card.replace(
        /(<div class="post-date hstack gap-narrow">\s*<span>)[\s\S]*?(<\/span>)/,
        `$1${esc(formatDate(article.published_at))}$2`
      );

      return card;
    };

    if (cards.length >= 8) {
      const datasets = [
        { title: "Parasayu", slug: "parasayu", articles: feed.parasayu.slice(0, 4) },
        { title: "Kesehatan", slug: "kesehatan", articles: feed.kesehatan.slice(0, 4) }
      ];

      section = section.replace(
        'href="blog-category.html">Gadgets</a>',
        'href="/category/lifestyle/parasayu">Parasayu</a>'
      );
      section = section.replace(
        'href="blog-category.html">Science</a>',
        'href="/category/lifestyle/kesehatan">Kesehatan</a>'
      );
      section = section.replace(
        "<span>See all Gadgets</span>",
        "<span>See all Parasayu</span>"
      );
      section = section.replace(
        '<a href="#" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto">',
        '<a href="/category/lifestyle/parasayu" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto">',
      );
      const secondButton = section.indexOf('<a href="#" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto">');
      if (secondButton !== -1) {
        section = section.slice(0, secondButton) + section.slice(secondButton).replace(
          '<a href="#" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto">',
          '<a href="/category/lifestyle/kesehatan" class="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 md:w-auto">',
          );
      }
      section = section.replace("<span>See all Science</span>", "<span>See all Kesehatan</span>");

      let cardIndex = 0;
      section = section.replace(articlePattern, (card) => {
        const column = cardIndex < 4 ? datasets[0] : datasets[1];
        const localIndex = cardIndex < 4 ? cardIndex : cardIndex - 4;
        cardIndex++;
        const article = column.articles[localIndex];
        return article ? updateCard(card, article, column.title, column.slug) : card;
      });

      html = html.slice(0, sectionStart) + section + html.slice(sectionEndIndex);
      console.log(`Template cards updated: ${cardIndex} slots; Parasayu ${datasets[0].articles.length}, Kesehatan ${datasets[1].articles.length}.`);
    } else {
      console.error(`Template section found but expected 8 cards; found ${cards.length}. No card data replaced.`);
    }
  } else {
    console.error("Original two-column template section not found; no card data replaced.");
  }




  // Reduce the gap above Latest News without changing Parasayu/Kesehatan.
  html = html.replace(
    '<div id="latest-news" class="latest-news section panel overflow-hidden">\n                <div class="section-outer panel py-5 lg:py-8">',
    '<div id="latest-news" class="latest-news section panel overflow-hidden">\n                <div class="section-outer panel pt-1 pb-5 lg:pt-2 lg:pb-8">'
  );

  // Hide Watch now and the ad immediately before Latest News in V3 output.
  // The original News5 HTML template remains untouched for future video use.
  const watchMarker = 'href="blog-category.html">Watch now</a>';
  const watchIndex = html.indexOf(watchMarker);

  if (watchIndex !== -1) {
    const watchStart = html.lastIndexOf(
      '<div class="section panel overflow-hidden swiper-parent uc-dark">',
      watchIndex
    );
    const watchEnd = html.indexOf("<!-- Section end -->", watchIndex);

    if (watchStart !== -1 && watchEnd !== -1) {
      html = html.slice(0, watchStart) +
        html.slice(watchEnd + "<!-- Section end -->".length);
      console.log("Watch now disembunyikan.");
    } else {
      console.error("Watch now tidak dihapus karena batas section tidak cocok.");
    }
  }

  // Remove only the ad-slot-2 block directly before Latest News.
  const latestMarker = '<div id="latest-news" class="latest-news section panel overflow-hidden">';
  const latestIndex = html.indexOf(latestMarker);
  const adIndex = latestIndex === -1 ? -1 : html.lastIndexOf("ad-slot-2.jpg", latestIndex);

  if (latestIndex !== -1 && adIndex !== -1) {
    const adStart = html.lastIndexOf(
      '<div class="section panel overflow-hidden">',
      adIndex
    );
    const latestSectionStart = html.lastIndexOf("<!-- Section start -->", latestIndex);

    if (adStart !== -1 && latestSectionStart > adStart && adIndex < latestIndex) {
      html = html.slice(0, adStart) + html.slice(latestSectionStart);
      console.log("Iklan sebelum Latest News dihapus.");
    } else {
      console.error("Batas iklan tidak cocok; iklan dibiarkan demi keamanan section lain.");
    }
  } else {
    console.log("Iklan ad-slot-2 sebelum Latest News tidak ditemukan.");
  }

  // Remove only the remaining standard advertisement section.
  const remainingAdIndex = html.indexOf("ad-slot.jpg");
  if (remainingAdIndex !== -1) {
    const wrapper = '<div class="section panel overflow-hidden">';
    const wrapperStart = html.lastIndexOf(wrapper, remainingAdIndex);

    if (wrapperStart !== -1) {
      const divTags = /<\/?div\b[^>]*>/gi;
      divTags.lastIndex = wrapperStart;
      let depth = 0;
      let match: RegExpExecArray | null;
      let wrapperEnd = -1;

      while ((match = divTags.exec(html)) !== null) {
        if (/^<\/div/i.test(match[0])) {
          depth--;
          if (depth === 0) {
            wrapperEnd = divTags.lastIndex;
            break;
          }
        } else if (!/\/>$/.test(match[0])) {
          depth++;
        }
      }

      if (wrapperEnd !== -1 && wrapperEnd > remainingAdIndex) {
        html = html.slice(0, wrapperStart) + html.slice(wrapperEnd);
      }
    }
  }

  // Normalize whitespace left where the original ad section was removed.
  html = html.replace(
    /(<\/div>)(?:\s*<!-- Section end -->)?\s*<!-- Section start -->\s*(?=<div)/g,
    "$1\n\n            <!-- Section start -->"
  );


  // LATEST NEWS V3: render original News5 cards
  // Keep V2 services and the original HTML template unchanged.
  const latestUsedIds = new Set<string>();

  [
    ...(feed.topStory ? [feed.topStory] : []),
    ...feed.latestHeadlines,
    ...feed.lifestyle,
    ...feed.explore,
    ...feed.entertainment,
    ...feed.parasayu,
    ...feed.kesehatan,
  ].forEach((article) => latestUsedIds.add(article.id));

  const allLatestArticles = allLatestSource.filter(
    (article) => !latestUsedIds.has(article.id)
  );

  const latestStart = html.indexOf(
    '<div id="latest-news" class="latest-news section panel overflow-hidden">'
  );

  if (latestStart !== -1) {
    const gridMarker =
      '<div class="row child-cols-12 sm:child-cols-6 md:child-cols-4 lg:child-cols-3 g-2 gy-4 md:g-3 md:gy-5 xl:g-4 xl:gy-6">';
    const gridStart = html.indexOf(gridMarker, latestStart);

    if (gridStart !== -1) {
      const divTags = /<\/?div\b[^>]*>/gi;
      divTags.lastIndex = gridStart;
      let depth = 0;
      let match: RegExpExecArray | null;
      let gridEnd = -1;

      while ((match = divTags.exec(html)) !== null) {
        if (/^<\/div/i.test(match[0])) {
          depth--;
          if (depth === 0) {
            gridEnd = divTags.lastIndex;
            break;
          }
        } else if (!/\/>$/.test(match[0])) {
          depth++;
        }
      }

      const sectionEnd = html.indexOf('<!-- Section end -->', latestStart);
      const templateGrid = gridEnd === -1 ? '' : html.slice(gridStart, gridEnd);
      const cardPattern =
        /<div>\s*<article class="post type-post panel vstack gap-1 lg:gap-2">[\s\S]*?<\/article>\s*<\/div>/g;
      const templateCard = templateGrid.match(cardPattern)?.[0];

      if (gridEnd !== -1 && sectionEnd !== -1 && templateCard) {
        const renderLatestCard = (
          original: string,
          article: (typeof allLatestArticles)[number],
          hidden: boolean
        ) => {
          const title = escapeHtml(article.title);
          const image = escapeHtml(
            article.media?.path || "/news5/assets/images/common/img-fallback.png"
          );
          const category = escapeHtml(
            article.subcategories?.name ||
            article.categories?.name ||
            "Berita"
          );
          const categorySlug =
            article.subcategories?.slug ||
            "news";
          const categoryHref = `/${escapeHtml(categorySlug)}`;
          const href = `/${escapeHtml(categorySlug)}/${escapeHtml(article.slug)}`;

          let card = original;
          card = card.replace(
            /<div>\s*<article/,
            hidden
              ? '<div hidden data-latest-extra="true"><article'
              : '<div data-latest-extra="false"><article'
          );
          card = card.replace(
            /data-src="[^"]*"/,
            `data-src="${image}"`
          );
          card = card.replace(
            /alt="[^"]*"/,
            `alt="${title}"`
          );
          card = card.replace(
            /href="blog-details\.html"/g,
            `href="${href}"`
          );
          card = card.replace(
            /href="blog-category\.html">[^<]*<\/a>/,
            `href="${categoryHref}">${category}</a>`
          );
          card = card.replace(
            /(<h3 class="post-title[^"]*">[\s\S]*?<a\b[^>]*>)[\s\S]*?(<\/a>)/,
            `$1${title}$2`
          );
          card = card.replace(
            /(<div class="post-date hstack gap-narrow">\s*<span>)[\s\S]*?(<\/span>)/,
            `$1${escapeHtml(formatDate(article.published_at))}$2`
          );
          return card;
        };

        const cards = allLatestArticles.map((article, index) =>
          renderLatestCard(templateCard, article, index >= 20)
        );

        html =
          html.slice(0, gridStart) +
          gridMarker +
          "\n" +
          cards.join("\n") +
          "\n</div>" +
          html.slice(gridEnd);

        const buttonMarker = '<span>See all latest news</span>';
        const buttonIndex = html.indexOf(buttonMarker, latestStart);

        if (buttonIndex !== -1) {
          const anchorStart = html.lastIndexOf("<a ", buttonIndex);
          const anchorOpenEnd = html.indexOf(">", anchorStart);

          if (anchorStart !== -1 && anchorOpenEnd !== -1) {
            const originalOpen = html.slice(anchorStart, anchorOpenEnd + 1);
            const updatedOpen = originalOpen
              .replace(/href="[^"]*"/, 'href="#latest-news"')
              .replace(/\s+id="[^"]*"/, "")
              .replace("<a ", '<a id="latest-load-more" ');
            html =
              html.slice(0, anchorStart) +
              updatedOpen +
              html.slice(anchorOpenEnd + 1);
          }
        }

        const loadMoreScript = `
<script>
(() => {
  const button = document.getElementById("latest-load-more");
  const section = document.getElementById("latest-news");
  if (!button || !section) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();
    const hiddenCards = section.querySelectorAll('[data-latest-extra="true"][hidden]');
    const nextCards = Array.from(hiddenCards).slice(0, 20);

    nextCards.forEach((card) => {
      card.hidden = false;
      card.setAttribute("data-latest-extra", "false");
      const image = card.querySelector("img[data-src]");
      if (image && image.dataset.src) {
        image.src = image.dataset.src;
        image.removeAttribute("data-src");
      }
    });

    if (section.querySelectorAll('[data-latest-extra="true"][hidden]').length === 0) {
      button.style.display = "none";
    }
  });

  if (section.querySelectorAll('[data-latest-extra="true"][hidden]').length === 0) {
    button.style.display = "none";
  }
})();
</script>
`;
        const bodyEnd = html.lastIndexOf("</body>");
        if (bodyEnd !== -1) {
          html = html.slice(0, bodyEnd) + loadMoreScript + "\n" + html.slice(bodyEnd);
        }

        console.log(
          `Latest News V3: ${Math.min(20, cards.length)} artikel awal; ${Math.max(0, cards.length - 20)} artikel tambahan tersedia.`
        );
      } else {
        console.error("Latest News V3 dilewati: batas grid atau kartu template tidak cocok.");
      }
    } else {
      console.error("Latest News V3 dilewati: grid template tidak ditemukan.");
    }
  } else {
    console.error("Latest News V3 dilewati: section tidak ditemukan.");
  }

  html = applyUrbanstoriesChrome(html);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
