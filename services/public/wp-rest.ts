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

export async function getWpPostBySlug(
    slug: string
): Promise<WpRestPost | null> {
    const response = await fetch(
        `${WP_REST_URL}/posts?slug=${encodeURIComponent(slug)}&_embed`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch WordPress post."
        );
    }

    const posts =
        (await response.json()) as WpRestPost[];

    return posts[0] ?? null;
}

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


async function getWpLookup<T>(
    endpoint: string,
    ids: number[],
    fields: string
): Promise<T[]> {
    if (!ids.length) {
        return [];
    }

    const chunks: number[][] = [];

    for (let i = 0; i < ids.length; i += 100) {
        chunks.push(ids.slice(i, i + 100));
    }

    const responses = await Promise.all(
        chunks.map((chunk) =>
            fetch(
                `${WP_REST_URL}/${endpoint}?include=${chunk.join(",")}&per_page=100&_fields=${fields}`,
                {
                    cache: "no-store",
                }
            )
        )
    );

    for (const response of responses) {
        if (!response.ok) {
            throw new Error(
                `Failed to fetch WordPress ${endpoint}.`
            );
        }
    }

    const results = await Promise.all(
        responses.map(
            (response) => response.json() as Promise<T[]>
        )
    );

    return results.flat();
}

export async function getWpHomepagePostsLight() {
    const perPage = 100;

    const firstResponse = await fetch(
        `${WP_REST_URL}/posts?per_page=${perPage}&page=1&_fields=id,slug,date,title,excerpt,author,featured_media,categories,tags,is_top_story,is_must_read,content,yoast_head_json`,
        {
            cache: "no-store",
        }
    );

    if (!firstResponse.ok) {
        throw new Error(
            "Failed to fetch WordPress homepage posts."
        );
    }

    const totalPages = Number(
        firstResponse.headers.get(
            "X-WP-TotalPages"
        ) ?? "1"
    );

    const posts =
        (await firstResponse.json()) as WpRestPost[];

    if (totalPages > 1) {
        const pageRequests = [];

        for (
            let page = 2;
            page <= totalPages;
            page++
        ) {
            pageRequests.push(
                fetch(
                    `${WP_REST_URL}/posts?per_page=${perPage}&page=${page}&_fields=id,slug,date,title,excerpt,author,featured_media,categories,tags,is_top_story,is_must_read,content,yoast_head_json`,
                    {
                        cache: "no-store",
                    }
                )
            );
        }

        const responses =
            await Promise.all(pageRequests);

        for (const response of responses) {
            if (!response.ok) {
                throw new Error(
                    "Failed to fetch WordPress homepage posts."
                );
            }
        }

        for (const response of responses) {
            const pagePosts =
                (await response.json()) as WpRestPost[];

            posts.push(...pagePosts);
        }
    }

    const authorIds = [
        ...new Set(
            posts
                .map((post) => post.author)
                .filter((id) => id > 0)
        ),
    ];

    const categoryIds = [
        ...new Set(
            posts.flatMap(
                (post) => post.categories ?? []
            )
        ),
    ];

    const tagIds = [
        ...new Set(
            posts.flatMap(
                (post) => post.tags ?? []
            )
        ),
    ];

    const [
        authors,
        categories,
        tags,
    ] = await Promise.all([
        getWpLookup<{
            id: number;
            name: string;
            slug: string;
        }>(
            "users",
            authorIds,
            "id,name,slug"
        ),
        getWpLookup<{
            id: number;
            parent: number;
            name: string;
            slug: string;
        }>(
            "categories",
            categoryIds,
            "id,parent,name,slug"
        ),
        getWpLookup<{
            id: number;
            name: string;
            slug: string;
        }>(
            "tags",
            tagIds,
            "id,name,slug"
        ),
    ]);

    const authorMap = new Map(
        authors.map((author) => [
            author.id,
            author,
        ])
    );

    const categoryMap = new Map(
        categories.map((category) => [
            category.id,
            category,
        ])
    );

    const tagMap = new Map(
        tags.map((tag) => [
            tag.id,
            tag,
        ])
    );

    return posts.map((post) => {
        const author =
            authorMap.get(post.author);

        const postCategories =
            (post.categories ?? [])
                .map((id) =>
                    categoryMap.get(id)
                )
                .filter(Boolean);

        const postTags =
            (post.tags ?? [])
                .map((id) =>
                    tagMap.get(id)
                )
                .filter(Boolean);

        return {
            ...post,
            _embedded: {
                author: author
                    ? [author]
                    : [],
                "wp:term": [
                    postCategories.map(
                        (category) => ({
                            id: category!.id,
                            parent:
                                category!.parent,
                            name:
                                category!.name,
                            slug:
                                category!.slug,
                            taxonomy:
                                "category",
                        })
                    ),
                    postTags.map(
                        (tag) => ({
                            id: tag!.id,
                            parent: 0,
                            name:
                                tag!.name,
                            slug:
                                tag!.slug,
                            taxonomy:
                                "post_tag",
                        })
                    ),
                ],
            },
        } as WpRestPost;
    });
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