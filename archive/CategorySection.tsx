type CategorySectionProps = {
  name: string;
  featured: {
    title: string;
    image: string;
  };
  stories: string[];
};

export default function CategorySection({
  name,
  featured,
  stories,
}: CategorySectionProps) {
  return (
    <section className="border-t border-black pt-10">

      <h2 className="text-2xl font-bold mb-8">
        {name}
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <article>

          <img
            src={featured.image}
            alt={featured.title}
            className="w-full aspect-[4/3] object-cover"
          />

          <h3 className="mt-5 text-2xl font-semibold leading-snug hover:opacity-70 transition">
            {featured.title}
          </h3>

        </article>

        <div className="space-y-6">

          {stories.map((story) => (

            <article
              key={story}
              className="border-b border-gray-200 pb-5"
            >
              <h4 className="text-lg font-medium hover:opacity-70 transition cursor-pointer">
                {story}
              </h4>
            </article>

          ))}

        </div>

      </div>

    </section>
  );
}