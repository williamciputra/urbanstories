import type { HomepageArticle } from "@/services/public/articles";

import LatestFeed from "../latest/LatestFeed";

type LatestSectionProps = {
    articles: HomepageArticle[];
    currentPage: number;
    totalPages: number;
};

export default function LatestSection({
    articles,
    currentPage,
    totalPages,
}: LatestSectionProps) {
    return (
        <section>

            <div className="mb-4 lg:mb-8">

                <h2 className="text-[20px] font-bold tracking-tight text-neutral-900 lg:text-2xl">
                    Latest Articles
                </h2>

            </div>

            <LatestFeed
                initialArticles={articles}
                currentPage={currentPage}
                totalPages={totalPages}
            />

        </section>
    );
}