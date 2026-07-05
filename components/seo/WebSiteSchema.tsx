export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "WebSite",

    name: "Urbanstories",

    url: "https://urbanstories.id",

    potentialAction: {
      "@type": "SearchAction",

      target:
        "https://urbanstories.id/search?q={search_term_string}",

      "query-input":
        "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}