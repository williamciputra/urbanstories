import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";

type HeadlineCardProps = {
    article: HomepageArticle;
};

export default function HeadlineCard({
    article,
}: HeadlineCardProps) {
    const imageUrl = article.media?.path ?? "";

    return (
        <Link
            href={`/${article.subcategories?.slug}/${article.slug}`}
            className="group block"
        >
            <article>

                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200">

                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={article.media?.alt_text ?? article.title}
                            fill
                            unoptimized
                            sizes="220px"
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                    )}

                </div>

                <p className="mt-3 text-[12px] font-semibold tracking-[0.02em] text-neutral-600">
                    {article.categories?.name}
                </p>

                <h3 className="mt-2 text-[16px] font-semibold leading-[1.45] text-neutral-900 transition group-hover:text-neutral-700">
                    {article.title}
                </h3>

                <p className="mt-2 text-[13px] text-neutral-500">
                    {new Date(article.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

            </article>
        </Link>
    );
}