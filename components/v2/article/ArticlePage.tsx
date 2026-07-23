import Container from "../layout/Container";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import ArticleSidebar from "./sidebar/ArticleSidebar";

import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import RelatedSection from "./RelatedSection";

import type {
    ArticlePageFeed,
} from "@/services/public/homepage-v2";

type ArticlePageProps = {
    feed: ArticlePageFeed;
};

export default function ArticlePage({
    feed,
}: ArticlePageProps) {
    const {
        article,
        mustRead,
        lifestyle,
        explore,
    } = feed;

    return (
        <main className="min-h-screen bg-[#FAF8F3]">
            <Header />

            <Container>
                <div className="mt-4 grid items-start gap-8 lg:grid-cols-[760px_320px]">
                    <div className="space-y-8">
                        <ArticleHeader article={article} />

                        <ArticleContent article={article} />
                    </div>

                    <ArticleSidebar
                        className="mt-14"
                        mustRead={mustRead}
                        lifestyle={lifestyle}
                        explore={explore}
                    />
                </div>

                <div className="mt-8 lg:mt-16 lg:w-[760px]">
                    <RelatedSection
                        articles={feed.relatedArticles}
                    />
                </div>
            </Container>

            <Footer />
        </main>
    );
}