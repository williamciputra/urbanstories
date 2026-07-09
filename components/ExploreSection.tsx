import CategorySection from "./CategorySection";

import type { HomepageArticle } from "@/services/public/articles";

type ExploreSectionProps = {
  articles: HomepageArticle[];
};

export default function ExploreSection({
  articles,
}: ExploreSectionProps) {
  return (
    <CategorySection
      category="Explore"
      articles={articles}
    />
  );
}