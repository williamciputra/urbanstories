import type { HomepageArticle } from "@/services/public/articles";

import MustReadWidget from "./MustReadWidget";
import VideoWidget from "./VideoWidget";
import MobileMustReadWidget from "../mobile/MobileMustReadWidget";

type SidebarTopProps = {
    articles: HomepageArticle[];
};

export default function SidebarTop({
    articles,
}: SidebarTopProps) {
    return (
        <>
            {/* Mobile */}
            <div className="lg:hidden">
                <MobileMustReadWidget articles={articles} />
            </div>

            {/* Desktop */}
            <aside className="hidden space-y-8 lg:block">
                <MustReadWidget
                    articles={articles}
                />

                <VideoWidget />
            </aside>
        </>
    );
}