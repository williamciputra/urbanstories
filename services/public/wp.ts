import { wpFetch } from "@/lib/wordpress/client";

export type WpHomepagePost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;

  author: {
    node: {
      name: string;
    };
  } | null;

  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };

  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
    };
  } | null;

  article: {
    isTopStory: boolean;
  };
};

type HomepagePostsResponse = {
  posts: {
    nodes: WpHomepagePost[];
  };
};

export async function getWpHomepagePosts(): Promise<HomepagePostsResponse> {
  return wpFetch<HomepagePostsResponse>(`
    query HomepagePosts {
      posts(first: 100) {
        nodes {
          id
          title
          slug
          excerpt
          content
          date

          author {
            node {
              name
            }
          }

          categories {
            nodes {
              name
              slug
            }
          }

          featuredImage {
            node {
              sourceUrl
              altText
            }
          }

          article {
            isTopStory
          }
        }
      }
    }
  `);
}