import MustReadWidget from "@/components/v2/sidebar/MustReadWidget";
import NewsletterWidget from "@/components/v2/sidebar/NewsletterWidget";

import ArticleVideo from "./ArticleVideo";
import ArticleSidebarSection from "./ArticleSidebarSection";

import type { HomepageArticle } from "@/services/public/articles";

type ArticleSidebarProps = {
    className?: string;

    mustRead: HomepageArticle[];
    lifestyle: HomepageArticle[];
    explore: HomepageArticle[];
};

export default function ArticleSidebar({
    className,

    mustRead,
    lifestyle,
    explore,
}: ArticleSidebarProps) {
    return (
        <aside
            className={[
                "hidden lg:block",
                "space-y-8",
                "lg:sticky lg:top-[116px]",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <MustReadWidget
                articles={mustRead}
            />

            <ArticleVideo />

            <ArticleSidebarSection
                title="Lifestyle"
                href="/lifestyle"
                articles={lifestyle}
            />

            <NewsletterWidget />

            <ArticleSidebarSection
                title="Explore"
                href="/explore"
                articles={explore}
            />
        </aside>
    );
}