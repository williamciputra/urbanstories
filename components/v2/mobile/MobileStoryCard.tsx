import Image from "next/image";
import Link from "next/link";

import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type MobileStoryCardProps = {
    article: HomepageArticle;
};

export default function MobileStoryCard({
    article,
}: MobileStoryCardProps) {

    const imageUrl = article.media?.path ?? "";

    return (
        <Link
            href={getArticlePath(article)}
            className="block"
        >
            <article className="relative overflow-hidden rounded-xl">

                <div className="relative aspect-[16/10] bg-neutral-200">

                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={article.media?.alt_text ?? article.title}
                            fill
                            unoptimized
                            sizes="100vw"
                            className="object-cover"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5">

                        <h2 className="mt-4 text-[20px] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                            {article.title}
                        </h2>

                    </div>

                </div>

            </article>
        </Link>
    );
}