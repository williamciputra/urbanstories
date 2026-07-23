import {
    CATEGORY_SLUGS,
} from "@/lib/taxonomy/categories";

import {
    SUBCATEGORY_SLUGS,
} from "@/lib/taxonomy/subcategories";

import type {
    HomepageArticle,
} from "@/services/public/articles";

import type {
    WpRestPost,
} from "@/services/public/wp-rest";

export function mapWpPostToHomepageArticle(
    post: WpRestPost
): HomepageArticle {
    const terms =
        post._embedded?.["wp:term"]?.flat() ?? [];

    const categories = terms.filter(
        (term) =>
            term.taxonomy === "category"
    );

    const tags = terms
        .filter(
            (term) =>
                term.taxonomy === "post_tag"
        )
        .map((term) => ({
            name: term.name,
            slug: term.slug,
        }));

    const categoryNames = Object.values(
        CATEGORY_SLUGS
    );

    const category =
        categories.find((term) =>
            categoryNames.includes(
                term.name as (typeof categoryNames)[number]
            )
        ) ?? null;

    let subcategory = null;

    if (category) {
        const categorySlug = Object.entries(
            CATEGORY_SLUGS
        ).find(
            ([, name]) =>
                name === category.name
        )?.[0];

        if (categorySlug) {
            const allowedSubs =
                Object.values(
                    SUBCATEGORY_SLUGS[
                    categorySlug as keyof typeof SUBCATEGORY_SLUGS
                    ]
                );

            subcategory =
                categories.find(
                    (term) =>
                        allowedSubs.includes(
                            term.name as never
                        )
                ) ?? null;
        }
    }

    const author =
        post._embedded?.author?.[0] ?? null;

    return {
        id: String(post.id),

        title: post.title.rendered,

        slug: post.slug,

        excerpt: post.excerpt.rendered,

        content: post.content.rendered,

        status: "published",

        published_at: post.date,

        is_top_story:
            post.is_top_story ?? false,

        is_must_read:
            post.is_must_read ?? false,

        authors: author
            ? {
                id: "",
                name: author.name,
            }
            : null,

        categories: category
            ? {
                id: String(category.id),
                name: category.name,
            }
            : null,

        subcategories: subcategory
            ? {
                id: String(subcategory.id),
                name: subcategory.name,
                slug: subcategory.slug,
            }
            : null,

        media: post.featured_image_url
            ? {
                id: "",
                path: post.featured_image_url,
                alt_text:
                    post.featured_image_alt ??
                    null,
                title: null,
            }
            : null,

        tags,
    };
}