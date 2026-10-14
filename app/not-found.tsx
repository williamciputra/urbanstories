import Link from "next/link";

import { V3Header as Header } from "@/components/v3/shared/V3Chrome";
import { V3Footer as Footer } from "@/components/v3/shared/V3Chrome";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex flex-1 items-center bg-white">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
            Error 404
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Halaman Tidak Ditemukan
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Maaf, halaman yang kamu cari tidak tersedia atau mungkin telah
            dipindahkan. Kamu bisa kembali ke beranda untuk menemukan cerita
            menarik lainnya.
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}