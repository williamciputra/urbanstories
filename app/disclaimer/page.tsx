import type { Metadata } from "next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Disclaimer | Urbanstories",
  description:
    "Ketentuan penggunaan informasi dan konten yang dipublikasikan oleh Urbanstories.",
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Disclaimer
          </h1>

          <div className="mt-12 space-y-8 text-lg leading-9 text-neutral-700">
            <p>
              Seluruh informasi yang dipublikasikan di Urbanstories disajikan
              dengan itikad baik untuk tujuan informasi dan edukasi.
            </p>

            <p>
              Kami berupaya memastikan setiap artikel akurat pada saat
              diterbitkan. Namun, Urbanstories tidak memberikan jaminan bahwa
              seluruh informasi selalu lengkap, mutakhir, atau bebas dari
              kesalahan.
            </p>

            <p>
              Keputusan yang diambil berdasarkan informasi dari situs ini
              sepenuhnya menjadi tanggung jawab pembaca. Urbanstories tidak
              bertanggung jawab atas kerugian yang timbul akibat penggunaan
              informasi yang tersedia di situs ini.
            </p>

            <p>
              Tautan menuju situs pihak ketiga disediakan untuk kenyamanan
              pembaca. Urbanstories tidak memiliki kendali atas isi maupun
              kebijakan situs tersebut.
            </p>

            <p>
              Dengan menggunakan Urbanstories, Anda dianggap telah memahami dan
              menyetujui ketentuan dalam halaman Disclaimer ini.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}