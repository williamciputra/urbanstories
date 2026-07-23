export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    "@id": "https://urbanstories.id/#website",

    url: "https://urbanstories.id",

    name: "Urbanstories",

    alternateName: "Urbanstories Indonesia",

    description:
      "Urbanstories menghadirkan berita, bisnis, teknologi, kesehatan, dan gaya hidup yang menginspirasi kehidupan urban.",

    publisher: {
      "@id": "https://urbanstories.id/#organization",
    },

    inLanguage: "id-ID",

    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://urbanstories.id/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
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