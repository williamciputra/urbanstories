import type {
    HomepageArticle,
} from "./articles";

import {
    getHomepageSource,
} from "./wordpress/articles";

const LATEST_PER_PAGE = 15;

export type LatestFeed = {
    articles: HomepageArticle[];
    currentPage: number;
    totalPages: number;
};

export async function getLatestFeed(
    page = 1
): Promise<LatestFeed> {

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

    articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name !==
                    "Lifestyle" &&
                article.categories?.name !==
                    "Explore"
        )
        .slice(0, 4)
        .forEach((article) =>
            usedIds.add(article.id)
        );

    articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name ===
                    "Lifestyle"
        )
        .slice(0, 5)
        .forEach((article) =>
            usedIds.add(article.id)
        );

    articles
        .filter(
            (article) =>
                !usedIds.has(article.id) &&
                article.categories?.name ===
                    "Explore"
        )
        .slice(0, 5)
        .forEach((article) =>
            usedIds.add(article.id)
        );

    const remainingArticles =
        articles.filter(
            (article) =>
                !usedIds.has(article.id)
        );

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                remainingArticles.length /
                LATEST_PER_PAGE
            )
        );

    const start =
        (page - 1) *
        LATEST_PER_PAGE;

    return {
        articles:
            remainingArticles.slice(
                start,
                start +
                    LATEST_PER_PAGE
            ),

        currentPage: page,

        totalPages,
    };
}