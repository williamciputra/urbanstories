import type {
    HomepageArticle,
    PublicArticle,
} from "./articles";

import {
    getRelatedArticles,
} from "./articles";

import {
    getHomepageSource,
} from "./wordpress/articles";

export type HomepageFeed = {
    topStory: HomepageArticle | null;
    mustRead: HomepageArticle[];
    latestHeadlines: HomepageArticle[];
    lifestyle: HomepageArticle[];
    explore: HomepageArticle[];
    entertainment: HomepageArticle[];
    parasayu: HomepageArticle[];
    kesehatan: HomepageArticle[];
    latestArticles: HomepageArticle[];
    currentPage: number;
    totalPages: number;
};

export type ArticlePageFeed = {
    article: PublicArticle;
    mustRead: HomepageArticle[];
    kesehatan: HomepageArticle[];
    lifestyle: HomepageArticle[];
    explore: HomepageArticle[];
    relatedArticles: HomepageArticle[];
};

const SECTION_SUBCATEGORY_SLUGS = new Set([
    "fashion", "travel", "kuliner",
    "refleksi", "intimacy", "leksikon", "parents",
    "film", "musik", "hot-issue", "pop-art",
    "parasayu", "kesehatan",
]);

// Only these subcategories belong in Hero/Latest Headlines.
// Sports is a standalone category and does not require a subcategory.
const HEADLINE_SUBCATEGORY_SLUGS = new Set([
    "nasional", "internasional", "ekonomi", "otomotif",
    "gadgets", "apps", "aplikasi", "ai",
]);

function byPublishedAt(
    articles: HomepageArticle[],
): HomepageArticle[] {
    return [...articles].sort(
        (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime()
    );
}

function getBySubcategories(
    articles: HomepageArticle[],
    usedIds: Set<string>,
    slugs: string[],
    limit: number
): HomepageArticle[] {
    const selected = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.subcategories?.slug &&
                slugs.includes(article.subcategories.slug)
        )
        .slice(0, limit);

    selected.forEach((article) => usedIds.add(article.id));
    return selected;
}

function isHomepageHeadlineEligible(article: HomepageArticle): boolean {
    if (SECTION_SUBCATEGORY_SLUGS.has(article.subcategories?.slug ?? "")) {
        return false;
    }

    if (article.categories?.name === "Sports") {
        return true;
    }

    return HEADLINE_SUBCATEGORY_SLUGS.has(
        article.subcategories?.slug ?? ""
    );
}

export function getHomepageFeedFromArticles(
    sourceArticles: HomepageArticle[]
): HomepageFeed {
    // WordPress normally returns newest first; sort explicitly so every section
    // follows published_at and does not depend on API response ordering.
    const articles = byPublishedAt(sourceArticles);
    const usedIds = new Set<string>();

    // Allocate dedicated sections first. Overflow remains available to Latest News.
    const lifestyle = getBySubcategories(
        articles, usedIds, ["fashion", "kuliner", "travel"], 6
    );
    const explore = getBySubcategories(
        articles, usedIds, ["refleksi", "intimacy", "leksikon", "parents"], 6
    );
    const entertainment = getBySubcategories(
        articles, usedIds, ["film", "musik", "hot-issue", "pop-art"], 6
    );
    const parasayu = getBySubcategories(
        articles, usedIds, ["parasayu"], 4
    );
    const kesehatan = getBySubcategories(
        articles, usedIds, ["kesehatan"], 4
    );

    // Only eligible non-section articles can be the active Top Story.
    // If several articles retain is_top_story=true, the newest published one wins.
    const topStory =
        articles
            .filter((article) => article.is_top_story)
            .sort(
                (a, b) =>
                    new Date(b.published_at).getTime() -
                    new Date(a.published_at).getTime()
            )[0] ?? null;

    if (topStory) {
        usedIds.add(topStory.id);
    }

    // Four newest eligible articles after the active Top Story.
    // Older articles still marked is_top_story return to chronological flow.
    const latestHeadlines = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                isHomepageHeadlineEligible(article)
        )
        .slice(0, 4);

    latestHeadlines.forEach((article) => usedIds.add(article.id));

    // Must Read is intentionally independent: it may duplicate articles in any section.
    const mustRead = articles
        .filter((article) => article.is_must_read)
        .slice(0, 4);

    // Everything not selected for a non-Must-Read homepage slot flows into Latest News,
    // including overflow from dedicated sections and older Top Story articles.
    const remainingArticles = articles.filter(
        (article) => !usedIds.has(article.id)
    );

    const latestPerPage = 20;
    const totalPages = Math.max(
        1, Math.ceil(remainingArticles.length / latestPerPage)
    );
    const latestArticles = remainingArticles.slice(0, latestPerPage);

    return {
        topStory,
        mustRead,
        latestHeadlines,
        lifestyle,
        explore,
        entertainment,
        parasayu,
        kesehatan,
        latestArticles,
        currentPage: 1,
        totalPages,
    };
}

export async function getHomepageFeed(): Promise<HomepageFeed> {
    const articles = await getHomepageSource();
    return getHomepageFeedFromArticles(articles);
}

export async function getArticlePageFeed(
    article: PublicArticle
): Promise<ArticlePageFeed> {
    const articles = byPublishedAt(await getHomepageSource());

    // Preserve the article-page section selections; homepage-only limits must not
    // change the article page's existing related-section data.
    const articlePageUsedIds = new Set<string>();
    const lifestyle = getBySubcategories(
        articles, articlePageUsedIds, ["fashion", "kuliner", "travel"], 6
    );
    const explore = getBySubcategories(
        articles, articlePageUsedIds, ["refleksi", "intimacy", "leksikon", "parents"], 6
    );
    const kesehatan = getBySubcategories(
        articles, articlePageUsedIds, ["kesehatan"], 5
    );

    const homepage = getHomepageFeedFromArticles(articles);
    const relatedArticles = await getRelatedArticles(
        article.slug,
        article.subcategories?.slug ?? null,
        article.tags,
        articles
    );

    return {
        article,
        mustRead: homepage.mustRead,
        kesehatan,
        lifestyle,
        explore,
        relatedArticles,
    };
}
