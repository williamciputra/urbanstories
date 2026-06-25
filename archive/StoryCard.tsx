type Story = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  hero: boolean;
  editorPick: boolean;
};

export default function StoryCard({
  story,
}: {
  story: Story;
}) {
  return (
    <article className="group cursor-pointer">
      <img
        src={story.image}
        alt={story.title}
        className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:opacity-90"
      />

      <p className="mt-5 text-sm text-gray-500">
        {story.category}
      </p>

      <h3 className="mt-3 text-2xl font-semibold leading-tight group-hover:underline">
        {story.title}
      </h3>

      <p className="mt-5 text-sm text-gray-500">
        {story.date}
      </p>

      <p className="text-sm text-gray-500">
        {story.author}
      </p>
    </article>
  );
}