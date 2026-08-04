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

    yoast_head_json?: {
        description?: string;
    };

    is_top_story: boolean;

    is_must_read: boolean;

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
    const perPage = 100;

    const firstResponse = await fetch(
        `${WP_REST_URL}/posts?_embed&per_page=${perPage}&page=1`,
        {
            cache: "no-store",
        }
    );

    if (!firstResponse.ok) {
        throw new Error(
            "Failed to fetch WordPress posts."
        );
    }

    const totalPages = Number(
        firstResponse.headers.get(
            "X-WP-TotalPages"
        ) ?? "1"
    );

    const posts =
        (await firstResponse.json()) as WpRestPost[];

    for (
        let page = 2;
        page <= totalPages;
        page++
    ) {
        const response = await fetch(
            `${WP_REST_URL}/posts?_embed&per_page=${perPage}&page=${page}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch WordPress posts page ${page}.`
            );
        }

        const pagePosts =
            (await response.json()) as WpRestPost[];

        posts.push(...pagePosts);
    }

    return posts;
}

export async function getWpTagBySlug(
    slug: string
) {
    const response = await fetch(
        `${WP_REST_URL}/tags?slug=${encodeURIComponent(
            slug
        )}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch WordPress tag."
        );
    }

    const tags = await response.json();

    return tags[0] ?? null;
}

export async function getWpPostsByTagId(
    tagId: number
) {
    const response = await fetch(
        `${WP_REST_URL}/posts?_embed&per_page=100&tags=${tagId}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch WordPress posts by tag."
        );
    }

    return (await response.json()) as WpRestPost[];
}