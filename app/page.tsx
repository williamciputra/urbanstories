import Header from "../components/Header";
import FeaturedNewsSection from "../components/FeaturedNewsSection";
import LifestyleSection from "../components/LifestyleSection";
import ExploreSection from "../components/ExploreSection";
import LatestArticles from "../components/LatestArticles";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FAF8F3]">
      <div className="mx-auto max-w-7xl px-6">
        <Header />

        <FeaturedNewsSection />

        <LifestyleSection />

        <ExploreSection />

        <section className="mt-32">
          <LatestArticles />
        </section>

        <section className="mt-32 pb-8">
          <Newsletter />
        </section>
      </div>

      <Footer />
    </main>
  );
}