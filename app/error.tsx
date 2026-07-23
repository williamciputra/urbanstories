"use client";

import { useEffect } from "react";
import Link from "next/link";

import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />

      <main className="flex flex-1 items-center bg-[#FAF8F3]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
            Terjadi Kesalahan
          </p>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Oops, ada sesuatu yang tidak berjalan semestinya.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Kami sedang berupaya memperbaikinya. Silakan coba muat ulang halaman
            atau kembali ke beranda.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="rounded-full border border-neutral-900 px-6 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
            >
              Coba Lagi
            </button>

            <Link
              href="/"
              className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Beranda
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}