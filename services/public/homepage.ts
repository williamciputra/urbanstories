import type {
    HomepageArticle,
} from "./articles";

import {
    getHomepageSource,
} from "./wordpress/articles";

const LATEST_PER_PAGE = 15;

export type HomepageFeed = {
    topStory: HomepageArticle | null;

    latestHeadlines: HomepageArticle[];

    lifestyle: HomepageArticle[];

    explore: HomepageArticle[];

    latestArticles: HomepageArticle[];

    currentPage: number;
    totalPages: number;
};

export async function getHomepageFeed(
    page = 1
): Promise<HomepageFeed> {
    const articles =
        await getHomepageSource();

    const topStory =
        articles.find(
            (article) => article.is_top_story
        ) ?? null;

    const usedIds = new Set<string>();

    if (topStory) {
        usedIds.add(topStory.id);
    }

    const headlineCategories = [
        "News",
        "Entertainment",
        "Technology",
        "Sports",
    ];

    const latestHeadlines = articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                headlineCategories.includes(
                    article.categories?.name ?? ""
                )
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
        .slice(0, 3);

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
        .slice(0, 3);

    explore.forEach((article) =>
        usedIds.add(article.id)
    );

    const remainingArticles =
        articles.filter(
            (article) =>
                !usedIds.has(article.id)
        );

    const totalPages = Math.max(
        1,
        Math.ceil(
            remainingArticles.length /
            LATEST_PER_PAGE
        )
    );

    const start =
        (page - 1) * LATEST_PER_PAGE;

    const latestArticles =
        remainingArticles.slice(
            start,
            start + LATEST_PER_PAGE
        );

    return {
        topStory,
        latestHeadlines,
        lifestyle,
        explore,
        latestArticles,

        currentPage: page,
        totalPages,
    };
}