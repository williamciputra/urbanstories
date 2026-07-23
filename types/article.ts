export interface Article {
  id: number;

  slug: string;

  title: string;

  excerpt: string;

  content: string;

  category: string;

  subcategory?: string;

  tags: {
    name: string;
    slug: string;
  }[];

  author: string;

  date: string;

  publishedAt: string;

  image: string;

  imageCaption: string;

  hero: boolean;

  editorPick: boolean;

  readTime: string;
}