import HeroCard from "../cards/HeroCard";

import type { HomepageArticle } from "@/services/public/articles";

type HeroSectionProps = {
  article: HomepageArticle | null;
};

export default function HeroSection({
  article,
}: HeroSectionProps) {
  return (
    <section>
      <HeroCard article={article} />
    </section>
  );
}