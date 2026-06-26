import type { Metadata } from "next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Urbanstories",
  description:
    "Pelajari bagaimana Urbanstories mengumpulkan, menggunakan, dan melindungi informasi pengunjung.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Kebijakan Privasi
          </h1>

          <div className="mt-12 space-y-8 text-lg leading-9 text-neutral-700">
            <p>
              Urbanstories menghargai privasi setiap pengunjung. Kami
              berkomitmen menjaga keamanan informasi yang Anda berikan saat
              menggunakan situs ini.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900">
              Informasi yang Dikumpulkan
            </h2>

            <p>
              Kami dapat mengumpulkan informasi non-personal seperti browser,
              perangkat, halaman yang dikunjungi, dan data analitik untuk
              meningkatkan kualitas layanan.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900">
              Penggunaan Informasi
            </h2>

            <p>
              Informasi digunakan untuk meningkatkan pengalaman pengguna,
              menganalisis performa situs, serta mengembangkan konten yang lebih
              relevan.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900">
              Cookie
            </h2>

            <p>
              Urbanstories dapat menggunakan cookie untuk membantu memahami
              perilaku pengunjung dan meningkatkan pengalaman penggunaan situs.
            </p>

            <h2 className="text-2xl font-semibold text-neutral-900">
              Perubahan Kebijakan
            </h2>

            <p>
              Kebijakan Privasi ini dapat diperbarui sewaktu-waktu sesuai
              perkembangan layanan Urbanstories.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}