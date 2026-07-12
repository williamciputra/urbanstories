const WP_REST_URL =
  process.env.WORDPRESS_REST_URL!;

export type WpMedia = {
  id: number;

  source_url: string;

  alt_text: string;

  title: {
    rendered: string;
  };
};

export async function getMediaMap(
  ids: number[]
): Promise<Record<number, WpMedia>> {
  console.log(
    "MEDIA IDS:",
    ids
  );

  if (!ids.length) {
    return {};
  }

  const response = await fetch(
    `${WP_REST_URL}/media?include=${ids.join(",")}&per_page=100`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const media =
    (await response.json()) as WpMedia[];

  console.log(
    "MEDIA RESPONSE:",
    JSON.stringify(media, null, 2)
  );

  return media.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<number, WpMedia>
  );
}