import { categories } from "../data/categories";
import CategorySection from "./CategorySection";

export default function FeaturedCategories() {
  return (
    <section className="mt-28">

      <h2 className="text-4xl font-bold">
        Featured Categories
      </h2>

      <div className="border-b border-black mt-4 mb-12"></div>

      <div className="space-y-20">

        {categories.map((category) => (

          <CategorySection
            key={category.name}
            name={category.name}
            featured={category.featured}
            stories={category.stories}
          />

        ))}

      </div>

    </section>
  );
}