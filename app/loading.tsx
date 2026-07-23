import Header from "@/components/v2/layout/Header";
import Footer from "@/components/v2/layout/Footer";

export default function Loading() {
  return (
    <>
      <Header />

      <main className="flex flex-1 items-center justify-center bg-[#FAF8F3]">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900" />

          <p className="mt-6 text-sm text-neutral-600">
            Memuat halaman...
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}