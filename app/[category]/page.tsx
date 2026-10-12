import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { V3Header as Header } from "@/components/v3/shared/V3Chrome";
import { V3Footer as Footer } from "@/components/v3/shared/V3Chrome";
import V3CategorySections from "@/components/v3/category/V3CategorySections";

import { getArticlesByCategory } from "@/services/public/articles";
import { getCategoryName } from "@/lib/taxonomy/categories";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { category } = await params;

  const formattedCategory =
    getCategoryName(category);

  return {
    title: `${formattedCategory} | Urbanstories`,
    description: `Artikel ${formattedCategory} di Urbanstories.`,
  };
}

export default async function CategoryPage({
  params,
}: Props) {
  const { category } = await params;

  const formattedCategory = getCategoryName(category) ?? category;

  const categoryArticles =
    await getArticlesByCategory(category);

  if (categoryArticles.length === 0) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-5 pt-8 pb-12 sm:px-6 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16">
          <div className="mb-6">
            <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#D71920] lg:gap-2 lg:text-[13px] lg:font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-neutral-900"
              >
                Home
              </Link>

              <span className="mx-1.5">›</span>

              <span>{formattedCategory}</span>
            </nav>
          </div>
          <V3CategorySections category={category} articles={categoryArticles} />
        </div>
      </main>

      <Footer />
    </>
  );
}