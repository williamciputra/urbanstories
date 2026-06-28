import TopStory from "./TopStory";
import LatestHeadlines from "./LatestHeadlines";

export default function FeaturedNewsSection() {
  return (
    <section className="mt-16">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] items-start">

        <div className="h-full">
          <TopStory />
        </div>

        <div className="h-full">
          <LatestHeadlines />
        </div>

      </div>
    </section>
  );
}