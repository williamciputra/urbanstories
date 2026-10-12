import ArticleMustRead from "./ArticleMustRead";
import ArticleKesehatan from "./ArticleKesehatan";
import type { HomepageArticle } from "@/services/public/articles";

type ArticleSidebarProps = {
    className?: string;
    mustRead: HomepageArticle[];
    kesehatan: HomepageArticle[];
    lifestyle?: HomepageArticle[];
    explore?: HomepageArticle[];
};

export default function ArticleSidebar({
    className,
    mustRead,
    kesehatan,
}: ArticleSidebarProps) {
    return (
        <aside
            className={[
                "hidden lg:block",
                "space-y-8",
                "lg:sticky lg:top-[40px]",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <ArticleMustRead articles={mustRead} />

            <ArticleKesehatan articles={kesehatan} />
        </aside>
    );
}
