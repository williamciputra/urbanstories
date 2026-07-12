import { getWpHomepagePosts } from "@/services/public/wp-rest";
import { getMediaMap } from "@/services/public/wp-media";
import { mapWpPostToHomepageArticle } from "@/lib/wordpress/mapper";

import type {
  HomepageArticle,
} from "@/services/public/articles";

async function getAllArticles(): Promise<
  HomepageArticle[]
> {
  const posts =
    await getWpHomepagePosts();

  const mediaIds = posts
    .map((post) => post.featured_media)
    .filter((id) => id > 0);

  const mediaMap =
    await getMediaMap(mediaIds);

  return posts.map((post) => {
    const article =
      mapWpPostToHomepageArticle(post);

    const media =
      mediaMap[post.featured_media];

    if (media) {
      article.media = {
        id: String(media.id),
        path: media.source_url,
        alt_text:
          media.alt_text ?? null,
        title:
          media.title.rendered ??
          null,
      };
    }

    return article;
  });
}

export async function getTopStory() {
  const articles =
    await getAllArticles();

  return (
    articles.find(
      (a) => a.is_top_story
    ) ?? null
  );
}

export async function getLatestHeadlines() {
  const articles =
    await getAllArticles();

  return articles
    .filter(
      (a) =>
        !a.is_top_story &&
        a.categories?.name !==
          "Lifestyle" &&
        a.categories?.name !==
          "Explore"
    )
    .slice(0, 4);
}

export async function getLatestArticles() {
  const articles =
    await getAllArticles();

  return articles
    .filter(
      (a) =>
        !a.is_top_story &&
        a.categories?.name !==
          "Lifestyle" &&
        a.categories?.name !==
          "Explore"
    )
    .slice(4, 19);
}

export async function getHomepageSource() {
  return getAllArticles();
}