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

    const category =
        categories[0] ?? null;

    const subcategory =
        categories[1] ?? null;

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
                    post.featured_image_alt ?? null,
                title: null,
            }
            : null,
    };
}