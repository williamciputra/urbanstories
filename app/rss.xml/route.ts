import { getRssArticles } from "@/services/public/articles";

const SITE_URL = "https://urbanstories.id";

export async function GET() {
    const articles =
        await getRssArticles();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>

<title>Urbanstories</title>

<link>${SITE_URL}</link>

<description>
Cerita yang Menginspirasi
</description>

<language>id-ID</language>

${articles
    .map((article) => {
        const url = `${SITE_URL}/${article.subcategories?.slug}/${article.slug}`;

        return `
<item>

<title><![CDATA[${article.title}]]></title>

<link>${url}</link>

<guid>${url}</guid>

<description><![CDATA[
${article.excerpt || article.title}
]]></description>

<pubDate>${new Date(
            article.published_at
        ).toUTCString()}</pubDate>

${article.authors?.name
                ? `<author>${article.authors.name}</author>`
                : ""}

</item>`;
    })
    .join("")}

</channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type":
                "application/rss+xml; charset=utf-8",
            "Cache-Control":
                "public, s-maxage=300, stale-while-revalidate=600",
        },
    });
}