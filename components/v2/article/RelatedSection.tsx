import LatestArticleCard from "../cards/LatestArticleCard";

import type {
    HomepageArticle,
} from "@/services/public/articles";

type RelatedSectionProps = {
    articles: HomepageArticle[];
};

export default function RelatedSection({
    articles,
}: RelatedSectionProps) {
    if (articles.length === 0) {
        return null;
    }

    return (
        <section>
            <div className="mb-3 lg:mb-8">
                <h2 className="text-[20px] font-semibold tracking-tight text-neutral-900 lg:text-2xl">
                    Related Articles
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-y-0 gap-x-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
                {articles.map((article) => (
                    <LatestArticleCard
                        key={article.id}
                        article={article}
                    />
                ))}
            </div>
        </section>
    );
}