import Container from "./layout/Container";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

import HeroSection from "./sections/HeroSection";
import HeadlineSection from "./sections/HeadlineSection";
import LifestyleSection from "./sections/LifestyleSection";
import ExploreSection from "./sections/ExploreSection";
import LatestSection from "./sections/LatestSection";

import SidebarTop from "./sidebar/SidebarTop";
import SidebarBottom from "./sidebar/SidebarBottom";

import MobileHeroCarousel from "./mobile/MobileHeroCarousel";

import type { HomepageFeed } from "@/services/public/homepage-v2";

type HomepageProps = {
    homepage: HomepageFeed;
};

export default function Homepage({
    homepage,
}: HomepageProps) {

    return (
        <main className="min-h-screen bg-[#FAF8F3]">

            <Header />

            <Container>

                {/* Hero + Headline + Sidebar Top */}
                <div className="mt-4 grid items-start gap-8 lg:grid-cols-[760px_320px]">

                    <div>

                        <MobileHeroCarousel
                            topStory={homepage.topStory}
                            latestHeadlines={homepage.latestHeadlines}
                        />

                        <div className="hidden lg:block">

                            <HeroSection
                                article={homepage.topStory}
                            />

                        </div>

                        <div className="hidden lg:block">

                            <HeadlineSection
                                articles={homepage.latestHeadlines}
                            />

                        </div>

                    </div>

                    <SidebarTop
                        articles={homepage.mustRead}
                    />

                </div>

                {/* Content + Sidebar Bottom */}
                <div className="mt-6 grid items-start gap-8 lg:grid-cols-[810px_270px]">

                    <div className="space-y-8">

                        <LifestyleSection
                            articles={homepage.lifestyle}
                        />

                        <ExploreSection
                            articles={homepage.explore}
                        />

                        <LatestSection
                            articles={homepage.latestArticles}
                            currentPage={homepage.currentPage}
                            totalPages={homepage.totalPages}
                        />

                    </div>

                    <div className="hidden lg:block">

                        <SidebarBottom />

                    </div>

                </div>

            </Container>

            <Footer />

        </main>
    );
}