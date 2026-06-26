import type { Metadata } from "next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Hubungi Kami | Urbanstories",
  description:
    "Hubungi tim Urbanstories untuk pertanyaan, kerja sama, maupun masukan mengenai konten kami.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Hubungi Kami
          </h1>

          <div className="mt-12 space-y-8 text-lg leading-9 text-neutral-700">
            <p>
              Kami terbuka untuk pertanyaan, masukan, maupun peluang kerja sama
              dengan Urbanstories.
            </p>

            <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-8">
              <p>
                <strong>Email</strong>
                <br />
                hello@urbanstories.id
              </p>

              <p>
                <strong>Editorial</strong>
                <br />
                editorial@urbanstories.id
              </p>

              <p>
                <strong>Kerja Sama</strong>
                <br />
                partnership@urbanstories.id
              </p>
            </div>

            <p>
              Kami akan berusaha merespons setiap pesan secepat mungkin pada
              hari kerja.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}