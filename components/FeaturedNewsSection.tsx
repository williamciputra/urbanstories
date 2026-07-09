import TopStory from "./TopStory";
import LatestHeadlines from "./LatestHeadlines";

import type { HomepageArticle } from "@/services/public/articles";

type FeaturedNewsSectionProps = {
  topStory: HomepageArticle | null;
  latestHeadlines: HomepageArticle[];
};

export default function FeaturedNewsSection({
  topStory,
  latestHeadlines,
}: FeaturedNewsSectionProps) {
  return (
    <section className="mt-8">
      <div className="grid items-start gap-6 lg:grid-cols-[1.55fr_1fr]">

        <div className="h-full">
          <TopStory article={topStory} />
        </div>

        <div className="h-full">
          <LatestHeadlines articles={latestHeadlines} />
        </div>

      </div>
    </section>
  );
}