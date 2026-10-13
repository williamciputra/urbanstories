type ArticleContentProps = {
    article: {
        content: string;
        tags: {
            name: string;
            slug: string;
        }[];
    };
};

export default function ArticleContent({
    article,
}: ArticleContentProps) {
    return (
        <>
            <section
                className="article-content text-neutral-800"
                dangerouslySetInnerHTML={{
                    __html: article.content,
                }}
            />

            {article.tags.length > 0 && (
                <div className="mt-8 border-t border-neutral-200 pt-5 lg:mt-10 lg:pt-6">

                    <div className="flex flex-wrap items-center gap-1.5">

                        <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-neutral-900 lg:mr-2 lg:text-sm">
                            Tags:
                        </span>

                        {article.tags.map((tag) => (
                            <a
                                key={tag.slug} style={{ color: "#D71920" }}
                                href={`/tag/${tag.slug}`}
                                className="
                                    rounded-full
                                    border
                                    border-neutral-300
                                    px-2.5
                                    py-1
                                    text-[12px]
                                    text-[#D71920]
                                    transition-all
                                    hover:border-[#D71920]
                                    hover:bg-[#D71920]
                                    hover:text-white
                                    lg:px-3
                                    lg:text-sm
                                "
                            >
                                {tag.name}
                            </a>
                        ))}

                    </div>

                </div>
            )}
        </>
    );
}