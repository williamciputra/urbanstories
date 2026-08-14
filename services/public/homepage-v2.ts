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

    latestArticles: HomepageArticle[];

    currentPage: number;
    totalPages: number;
};

export type ArticlePageFeed = {
    article: PublicArticle;

    mustRead: HomepageArticle[];

    lifestyle: HomepageArticle[];

    explore: HomepageArticle[];

    relatedArticles: HomepageArticle[];
};

export function getHomepageFeedFromArticles(
    articles: HomepageArticle[]
): HomepageFeed {
    const topStory =
        articles.find(
            (article) => article.is_top_story
        ) ?? null;

    const mustRead = articles
        .filter(
            (article) => article.is_must_read
        )
        .slice(0, 5);

    const usedIds = new Set<string>();

    if (topStory) {
        usedIds.add(topStory.id);
    }

    const latestHeadlines = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name !==
                "Lifestyle" &&
                article.categories?.name !==
                "Explore"
        )
        .slice(0, 4);

    latestHeadlines.forEach((article) =>
        usedIds.add(article.id)
    );

    const lifestyle = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name ===
                "Lifestyle"
        )
        .slice(0, 5);

    lifestyle.forEach((article) =>
        usedIds.add(article.id)
    );

    const explore = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name ===
                "Explore"
        )
        .slice(0, 5);

    explore.forEach((article) =>
        usedIds.add(article.id)
    );

    const latest =
        getLatestFeedFromArticles(articles, 1);

    return {
        topStory,
        mustRead,
        latestHeadlines,
        lifestyle,
        explore,
        latestArticles:
            latest.articles,

        currentPage:
            latest.currentPage,

        totalPages:
            latest.totalPages,
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

        lifestyle: homepage.lifestyle,

        explore: homepage.explore,

        relatedArticles,
    };
}