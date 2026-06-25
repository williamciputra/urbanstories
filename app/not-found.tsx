import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-6">
      <div className="max-w-2xl text-center">

        <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">
          404
        </p>

        <h1 className="mt-6 text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-neutral-600">
          This page couldn&apos;t be found,
          <br className="hidden md:block" />
          but your next great story is waiting.
        </p>

        <Link
          href="/"
          className="mt-12 inline-flex rounded-full border border-neutral-900 px-8 py-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          Explore Urbanstories →
        </Link>

      </div>
    </main>
  );
}