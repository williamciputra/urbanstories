import Header from "../components/Header";
import TopStory from "../components/TopStory";
import LatestHeadlines from "../components/LatestHeadlines";
import CategorySection from "../components/CategorySection";
import FeaturedInsight from "../components/FeaturedInsight";
import LatestArticles from "../components/LatestArticles";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FAF8F3]">

      <div className="mx-auto max-w-7xl px-6">

        <Header />

        <section className="mt-16">
          <TopStory />
        </section>

        <section className="mt-32">
          <LatestHeadlines />
        </section>

        <CategorySection category="Lifestyle" />

        <CategorySection category="Explore" />

        <FeaturedInsight />

        <section className="mt-32">
          <LatestArticles />
        </section>

        <section className="mt-32 pb-20">
          <Newsletter />
        </section>

      </div>

      <Footer />

    </main>
  );
}