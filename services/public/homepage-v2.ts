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

import {
    getLatestFeedFromArticles,
} from "./latest-v2";

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

export function getHomepageFeedFromArticles(
    articles: HomepageArticle[]
): HomepageFeed {
    const usedIds = new Set<string>();

    // Alokasikan artikel ke section terlebih dahulu agar tidak tersedot ke Hero.
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
        articles, usedIds, ["parasayu"], 5
    );
    const kesehatan = getBySubcategories(
        articles, usedIds, ["kesehatan"], 5
    );

    // Hero hanya mengambil Top Story yang belum dialokasikan ke section.
    const topStory =
        articles.find(
            (article) => article.is_top_story && !usedIds.has(article.id)
        ) ?? null;

    if (topStory) {
        usedIds.add(topStory.id);
    }

    // Latest Headlines hanya untuk News, Technology, dan Sports.
    const headlineCategories = ["News", "Technology", "Sports"];
    const latestHeadlines = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                headlineCategories.includes(article.categories?.name ?? "")
        )
        .slice(0, 4);

    latestHeadlines.forEach((article) => usedIds.add(article.id));

    // Must Read maksimal empat artikel; boleh muncul juga di bagian lain.
    const mustRead = articles
        .filter((article) => article.is_must_read)
        .slice(0, 4);

    const remainingArticles = articles.filter(
        (article) => !usedIds.has(article.id)
    );

    const latestPerPage = 20;
    const totalPages = Math.max(
        1, Math.ceil(remainingArticles.length / latestPerPage)
    );
    const latestArticles = remainingArticles.slice(0, latestPerPage);

    return {
        topStory, mustRead, latestHeadlines, lifestyle, explore,
        entertainment, parasayu, kesehatan, latestArticles,
        currentPage: 1, totalPages
    };
}

export async function getHomepageFeed(): Promise<HomepageFeed> {
    const articles =
        await getHomepageSource();

    return getHomepageFeedFromArticles(
        articles
    );
}

export async function getArticlePageFeed(
    article: PublicArticle
): Promise<ArticlePageFeed> {
    const articles =
        await getHomepageSource();

    const homepage =
        getHomepageFeedFromArticles(articles);

    const relatedArticles =
        await getRelatedArticles(
            article.slug,
            article.subcategories?.slug ??
            null,
            article.tags,
            articles
        );

    return {
        article,

        mustRead: homepage.mustRead,

        kesehatan: homepage.kesehatan,

        lifestyle: homepage.lifestyle,

        explore: homepage.explore,

        relatedArticles,
    };
}