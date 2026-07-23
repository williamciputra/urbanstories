import LifestyleSection from "./LifestyleSection";
import ExploreSection from "./ExploreSection";

import type { HomepageArticle } from "@/services/public/articles";

type LifestyleExploreSectionProps = {
  lifestyle: HomepageArticle[];
  explore: HomepageArticle[];
};

export default function LifestyleExploreSection({
  lifestyle,
  explore,
}: LifestyleExploreSectionProps) {
  return (
    <section className="-mt-12">

      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">

        <LifestyleSection
          articles={lifestyle}
        />

        <ExploreSection
          articles={explore}
        />

      </div>

    </section>
  );
}