import { getRssArticles } from "@/services/public/articles";

export async function GET() {
  const articles = await getRssArticles();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>

<title>Urbanstories</title>

<link>https://urbanstories.id</link>

<description>
Cerita yang Menginspirasi
</description>

<language>id-ID</language>

${articles
  .map(
    (article) => `
<item>

<title><![CDATA[${article.title}]]></title>

<link>
https://urbanstories.id/articles/${article.slug}
</link>

<guid>
https://urbanstories.id/articles/${article.slug}
</guid>

<description><![CDATA[
${article.excerpt || article.title}
]]></description>

<pubDate>
${new Date(
  article.published_at
).toUTCString()}
</pubDate>

${article.authors?.name
        ? `<author>${article.authors.name}</author>`
        : ""}

</item>
`
  )
  .join("")}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type":
        "application/rss+xml; charset=utf-8",
    },
  });
}