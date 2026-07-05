export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: "Urbanstories",

    url: "https://urbanstories.id",

    logo: "https://urbanstories.id/icon-512.png",

    description:
      "Urbanstories adalah media digital yang menghadirkan cerita tentang gaya hidup, kesehatan, teknologi terkini, dan isu-isu menarik yang menginspirasi masyarakat urban.",

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