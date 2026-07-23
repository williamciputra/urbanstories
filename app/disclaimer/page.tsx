import type { Metadata } from "next";

import StaticPageLayout from "@/components/v2/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "Disclaimer | Urbanstories",
  description:
    "Ketentuan penggunaan informasi dan konten yang dipublikasikan oleh Urbanstories.",
};

export default function DisclaimerPage() {
  return (
    <StaticPageLayout title="Disclaimer">
      <p>
        Seluruh informasi yang dipublikasikan di Urbanstories disajikan dengan
        itikad baik untuk tujuan informasi dan edukasi.
      </p>

      <p>
        Kami berupaya memastikan setiap artikel akurat pada saat diterbitkan.
        Namun, Urbanstories tidak memberikan jaminan bahwa seluruh informasi
        selalu lengkap, mutakhir, atau bebas dari kesalahan.
      </p>

      <p>
        Keputusan yang diambil berdasarkan informasi dari situs ini sepenuhnya
        menjadi tanggung jawab pembaca. Urbanstories tidak bertanggung jawab
        atas kerugian, baik secara langsung maupun tidak langsung, yang timbul
        akibat penggunaan informasi yang tersedia di situs ini.
      </p>

      <p>
        Tautan menuju situs pihak ketiga dapat disediakan sebagai referensi atau
        kemudahan bagi pembaca. Urbanstories tidak memiliki kendali atas isi,
        kebijakan, maupun praktik yang diterapkan oleh situs pihak ketiga
        tersebut.
      </p>

      <p>
        Dengan mengakses dan menggunakan Urbanstories, Anda dianggap telah
        membaca, memahami, dan menyetujui seluruh ketentuan yang tercantum pada
        halaman Disclaimer ini.
      </p>
    </StaticPageLayout>
  );
}