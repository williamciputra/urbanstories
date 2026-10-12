import Image from "next/image";
import Link from "next/link";
import type { HomepageArticle } from "@/services/public/articles";
import { getArticlePath } from "@/lib/utils/articleUrl";

type ArticleKesehatanProps = {
    articles: HomepageArticle[];
};

export default function ArticleKesehatan({
    articles,
}: ArticleKesehatanProps) {
    return (
        <section className="rounded-xl border border-neutral-200 bg-white p-5">
            <h2
                className="mb-5 flex items-center gap-2 font-bold leading-tight tracking-tight text-neutral-900"
                style={{ fontSize: "20px" }}
            >
                <span className="inline-block h-2 w-2 shrink-0 bg-[#D71920]" />
                Kesehatan
            </h2>

            <div className="space-y-5">
                {articles.slice(0, 5).map((article) => (
                    <article key={article.id} className="space-y-2">
                        <Link
                            href={getArticlePath(article)}
                            className="relative block aspect-[16/9] w-full overflow-hidden rounded-md bg-neutral-100"
                        >
                            {article.media?.path && (
                                <Image
                                    src={article.media.path}
                                    alt={article.media.alt_text ?? article.title}
                                    fill
                                    sizes="320px"
                                    className="object-cover"
                                />
                            )}
                        </Link>

                        <h3
                            className="m-0 font-bold leading-snug text-neutral-900"
                            style={{
                                fontSize: "14px",
                                fontFamily: "Arial, Helvetica, sans-serif",
                            }}
                        >
                            <Link
                                href={getArticlePath(article)}
                                className="text-inherit no-underline"
                            >
                                {article.title}
                            </Link>
                        </h3>
                    </article>
                ))}
            </div>

            <Link
                href="/category/lifestyle/kesehatan"
                className="animate-btn gap-0 btn btn-sm btn-alt-primary bg-transparent dark:text-white border w-100 mt-4"
            >
                <span>See all Kesehatan</span>
                <i className="icon icon-1 unicon-chevron-right" />
            </Link>
        </section>
    );
}
