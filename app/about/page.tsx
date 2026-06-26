import type { Metadata } from "next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami | Urbanstories",
  description:
    "Mengenal Urbanstories, media digital yang menghadirkan cerita inspiratif seputar gaya hidup, teknologi, kesehatan, dan informasi terkini lainnya yang bermanfaat dan menginspirasi.",
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h1 className="text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl">
            Tentang Urbanstories
          </h1>

          <div className="mt-12 space-y-8 text-lg leading-9 text-neutral-700">
            <p>
              Urbanstories adalah media digital yang menghadirkan cerita,
              wawasan, dan inspirasi tentang gaya hidup, kesehatan, bisnis, teknologi,
              serta informasi yang menginspirasi bagi masyarakat urban.
            </p>

            <p>
              Kami percaya bahwa jurnalisme yang baik bukan hanya menyampaikan
              informasi, tetapi juga membantu pembaca memahami perubahan dunia
              melalui tulisan yang akurat, mendalam, dan mudah dipahami.
            </p>

            <p>
              Urbanstories berkomitmen menghadirkan konten yang relevan,
              kredibel, dan memberikan nilai tambah bagi setiap pembaca.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}