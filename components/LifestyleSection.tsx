import CategorySection from "./CategorySection";

import type { HomepageArticle } from "@/services/public/articles";

type LifestyleSectionProps = {
  articles: HomepageArticle[];
};

export default function LifestyleSection({
  articles,
}: LifestyleSectionProps) {
  return (
    <CategorySection
      category="Lifestyle"
      articles={articles}
    />
  );
}