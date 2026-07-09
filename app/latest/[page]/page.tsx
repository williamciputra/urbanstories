import Header from "@/components/Header";
import FeaturedNewsSection from "@/components/FeaturedNewsSection";
import LifestyleSection from "@/components/LifestyleSection";
import ExploreSection from "@/components/ExploreSection";
import LatestArticles from "@/components/LatestArticles";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

import { getHomepageFeed } from "@/services/public/homepage";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export default async function LatestPage({
  params,
}: Props) {
  const { page } = await params;

  const currentPage = Math.max(
    2,
    Number(page) || 2
  );

  const homepage =
    await getHomepageFeed(currentPage);

  return (
    <main className="bg-[#FAF8F3]">
      <div className="mx-auto max-w-7xl px-6">

        <Header />

        <FeaturedNewsSection
          topStory={homepage.topStory}
          latestHeadlines={
            homepage.latestHeadlines
          }
        />

        <LifestyleSection
          articles={homepage.lifestyle}
        />

        <ExploreSection
          articles={homepage.explore}
        />

        <section className="mt-32">
          <LatestArticles
            articles={homepage.latestArticles}
            currentPage={
              homepage.currentPage
            }
            totalPages={
              homepage.totalPages
            }
          />
        </section>

        <section className="mt-32 pb-8">
          <Newsletter />
        </section>

      </div>

      <Footer />
    </main>
  );
}