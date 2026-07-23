import type { Metadata } from "next";

import StaticPageLayout from "@/components/v2/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | Urbanstories",
  description:
    "Pelajari bagaimana Urbanstories mengumpulkan, menggunakan, dan melindungi informasi pengunjung.",
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout title="Kebijakan Privasi">
      <p>
        Urbanstories menghargai privasi setiap pengunjung. Kami berkomitmen
        menjaga keamanan informasi yang Anda berikan saat menggunakan situs ini.
      </p>

      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Informasi yang Dikumpulkan
        </h2>

        <p>
          Kami dapat mengumpulkan informasi non-personal seperti jenis browser,
          perangkat, halaman yang dikunjungi, alamat IP yang dianonimkan, serta
          data analitik untuk memahami penggunaan situs dan meningkatkan kualitas
          layanan.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Penggunaan Informasi
        </h2>

        <p>
          Informasi yang dikumpulkan digunakan untuk meningkatkan pengalaman
          pengguna, menganalisis performa situs, mengembangkan konten yang lebih
          relevan, serta menjaga keamanan layanan Urbanstories.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Cookie
        </h2>

        <p>
          Urbanstories dapat menggunakan cookie untuk membantu memahami perilaku
          pengunjung, mengingat preferensi tertentu, dan meningkatkan pengalaman
          penggunaan situs. Pengguna dapat mengatur penggunaan cookie melalui
          pengaturan browser masing-masing.
        </p>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Perubahan Kebijakan
        </h2>

        <p>
          Kebijakan Privasi ini dapat diperbarui sewaktu-waktu untuk menyesuaikan
          perkembangan layanan maupun perubahan peraturan yang berlaku. Setiap
          perubahan akan dipublikasikan melalui halaman ini.
        </p>
      </div>
    </StaticPageLayout>
  );
}