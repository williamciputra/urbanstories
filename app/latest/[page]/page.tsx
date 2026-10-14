import Link from "next/link";

import { V3Header as Header, V3Footer as Footer } from "@/components/v3/shared/V3Chrome";
import V3ArticleGrid from "@/components/v3/category/V3ArticleGrid";
import { getHomepageFeed } from "@/services/public/homepage";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

export default async function LatestPage({ params }: Props) {
  const { page } = await params;

  const currentPage = Math.max(2, Number(page) || 2);
  const homepage = await getHomepageFeed(currentPage);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-10 lg:py-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="transition-colors hover:text-neutral-900">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <span className="font-medium text-neutral-900">Artikel Terbaru</span>
          </nav>

          <header className="mb-7 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="panel d-inline-block bg-primary h-8px w-8px translate-y-px"
            />
            <h1 className="h3 m-0 text-inherit">Artikel Terbaru</h1>
          </header>

          {homepage.latestArticles.length > 0 ? (
            <V3ArticleGrid articles={homepage.latestArticles} />
          ) : (
            <p className="py-12 text-center text-neutral-600">
              Belum ada artikel pada halaman ini.
            </p>
          )}

          <nav
            aria-label="Navigasi halaman artikel"
            className="mt-10 flex items-center justify-center gap-6 text-sm"
          >
            {homepage.currentPage > 2 ? (
              <Link
                href={homepage.currentPage === 3 ? "/latest/2" : `/latest/${homepage.currentPage - 1}`}
                className="text-neutral-700 transition hover:text-primary"
              >
                ← Sebelumnya
              </Link>
            ) : (
              <Link href="/" className="text-neutral-700 transition hover:text-primary">
                ← Beranda
              </Link>
            )}

            <span className="font-semibold text-neutral-900">
              Halaman {homepage.currentPage} dari {homepage.totalPages}
            </span>

            {homepage.currentPage < homepage.totalPages ? (
              <Link
                href={`/latest/${homepage.currentPage + 1}`}
                className="text-neutral-700 transition hover:text-primary"
              >
                Berikutnya →
              </Link>
            ) : (
              <span className="text-neutral-400">Berikutnya →</span>
            )}
          </nav>
        </div>
      </main>

      <Footer />
    </>
  );
}
