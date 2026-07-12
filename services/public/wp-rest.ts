const WP_REST_URL =
    process.env.WORDPRESS_REST_URL!;

export type WpRestPost = {
    id: number;
    slug: string;
    date: string;

    title: {
        rendered: string;
    };

    excerpt: {
        rendered: string;
    };

    content: {
        rendered: string;
    };

    author: number;

    featured_media: number;

    categories: number[];

    tags: number[];

    featured_image_url: string | null;

    featured_image_alt: string | null;

    is_top_story: boolean;

    _embedded?: {
        author?: {
            id: number;
            name: string;
            slug: string;
        }[];

        "wp:featuredmedia"?: {
            id: number;
            source_url: string;
            alt_text: string;
        }[];

        "wp:term"?: {
            id: number;
            parent: number;
            name: string;
            slug: string;
            taxonomy: string;
        }[][];
    };
};

export async function getWpHomepagePosts() {
    const response = await fetch(
        `${WP_REST_URL}/posts?_embed&per_page=100`,
        {
            next: {
                revalidate: 60,
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch WordPress posts."
        );
    }

    return (await response.json()) as WpRestPost[];
}