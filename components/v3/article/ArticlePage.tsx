import Container from "@/components/v2/layout/Container";
import { V3Header, V3Footer } from "@/components/v3/shared/V3Chrome";
import ArticleSidebar from "@/components/v2/article/sidebar/ArticleSidebar";
import ArticleHeader from "@/components/v2/article/ArticleHeader";
import ArticleContent from "@/components/v2/article/ArticleContent";
import RelatedSection from "@/components/v2/article/RelatedSection";
import type { ArticlePageFeed } from "@/services/public/homepage-v2";

type ArticlePageProps = { feed: ArticlePageFeed };

export default function ArticlePage({ feed }: ArticlePageProps) {
  const { article, mustRead, kesehatan, lifestyle, explore } = feed;

  return (
    <main className="min-h-screen bg-white">
      <V3Header />
      <Container>
        <div className="mt-4 grid items-start gap-8 lg:grid-cols-[760px_320px]">
          <div className="space-y-8">
            <ArticleHeader article={article} />
            <ArticleContent article={article} />
          </div>
          <ArticleSidebar
            className="mt-0"
            mustRead={mustRead}
            kesehatan={kesehatan}
            lifestyle={lifestyle}
            explore={explore}
          />
        </div>
        <div className="mt-3 border-t border-neutral-200 lg:mt-3" />
        <div className="mt-2 w-full">
          <RelatedSection articles={feed.relatedArticles} />
        </div>
      </Container>
      <V3Footer />
    </main>
  );
}
