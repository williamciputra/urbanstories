import Header from "../components/Header";
import Hero from "../components/Hero";
import EditorsPick from "../components/EditorsPick";
import FeaturedCategory from "../components/FeaturedCategory";
import FeaturedInsight from "../components/FeaturedInsight";
import NewsFeed from "../components/NewsFeed";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-[#FAF8F3]">

      <div className="mx-auto max-w-7xl px-6">

        <Header />

        <section className="pt-28">
          <Hero />
        </section>

        <section className="mt-32">
          <EditorsPick />
        </section>

        <FeaturedCategory category="Lifestyle" />

        <FeaturedCategory category="Health" />

        <FeaturedInsight />

        <section className="mt-32">
          <NewsFeed />
        </section>

        <section className="mt-32 pb-20">
          <Newsletter />
        </section>

      </div>

      <Footer />

    </main>
  );
}