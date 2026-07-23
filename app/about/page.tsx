import type { Metadata } from "next";
import Link from "next/link";

import StaticPageLayout from "@/components/v2/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "Tentang Kami | Urbanstories",
  description:
    "Mengenal Urbanstories, media digital yang menghadirkan cerita inspiratif seputar gaya hidup, teknologi, kesehatan, bisnis, dan berbagai informasi yang relevan bagi masyarakat urban.",
};

export default function AboutPage() {
  return (
    <StaticPageLayout title="Tentang Urbanstories">
      <p>
        Urbanstories adalah media digital yang menghadirkan cerita, wawasan, dan
        inspirasi seputar gaya hidup, kesehatan, bisnis, teknologi, hingga
        berbagai isu yang relevan dengan kehidupan masyarakat urban.
      </p>

      <p>
        Kami percaya bahwa jurnalisme tidak sekadar menyampaikan fakta, tetapi
        juga membantu pembaca memahami perubahan, melihat berbagai perspektif,
        dan mengambil keputusan berdasarkan informasi yang akurat, mendalam,
        serta mudah dipahami.
      </p>

      <p>
        Setiap artikel yang kami publikasikan disusun dengan mengedepankan
        kredibilitas, relevansi, dan kualitas, sehingga mampu memberikan nilai
        tambah bagi pembaca di tengah derasnya arus informasi digital.
      </p>

      <p>
        Kami juga terbuka untuk menjalin kolaborasi, menerima masukan, maupun
        menjawab pertanyaan dari pembaca dan mitra. Untuk informasi lebih
        lanjut, kerja sama, atau kebutuhan media, silakan menghubungi kami
        melalui{" "}
        <Link
          href="mailto:hello@urbanstories.id"
          className="font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
        >
          hello@urbanstories.id
        </Link>
        .
      </p>
    </StaticPageLayout>
  );
}