import Link from "next/link";

const categories = [
    "News",
    "Lifestyle",
    "Entertainment",
    "Technology",
    "Sports",
    "Explore",
];

export default function CategoryWidget() {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-5">

            <h2 className="mb-4 text-sm font-bold tracking-[0.08em] text-neutral-900">
                Kategori
            </h2>

            <div className="flex flex-wrap gap-2">

                {categories.map((category) => (
                    <Link
                        key={category}
                        href={`/${category.toLowerCase()}`}
                        className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
                    >
                        {category}
                    </Link>
                ))}

            </div>

        </section>
    );
}