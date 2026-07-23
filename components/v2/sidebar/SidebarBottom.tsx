import NewsletterWidget from "./NewsletterWidget";
import CategoryWidget from "./CategoryWidget";
import QuoteWidget from "./QuoteWidget";
import AdvertisementWidget from "./AdvertisementWidget";

export default function SidebarBottom() {
    return (
        <aside className="space-y-8 lg:sticky lg:top-[116px]">

            <NewsletterWidget />

            <CategoryWidget />

            <QuoteWidget />

            <AdvertisementWidget />

        </aside>
    );
}