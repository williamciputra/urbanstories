export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": "https://urbanstories.id/#organization",

    name: "Urbanstories",

    url: "https://urbanstories.id",

    logo: {
      "@type": "ImageObject",
      url: "https://urbanstories.id/icon-512.png",
      width: 512,
      height: 512,
    },

    image: "https://urbanstories.id/opengraph-image.png",

    description:
      "Urbanstories adalah media digital yang menghadirkan berita, bisnis, teknologi, kesehatan, dan gaya hidup yang menginspirasi masyarakat urban.",

    email: "hello@urbanstories.id",

    sameAs: [],
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