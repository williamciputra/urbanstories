import type { Metadata } from "next";
import Link from "next/link";

import StaticPageLayout from "@/components/v2/static/StaticPageLayout";

export const metadata: Metadata = {
  title: "Hubungi Kami | Urbanstories",
  description:
    "Hubungi tim Urbanstories untuk pertanyaan, kerja sama, maupun masukan mengenai konten Urbanstories.",
};

export default function ContactPage() {
  return (
    <StaticPageLayout title="Hubungi Kami">
      <p>
        Kami terbuka untuk pertanyaan, masukan, maupun peluang kerja sama
        dengan Urbanstories. Jika kamu ingin menghubungi tim kami terkait
        editorial, kolaborasi, atau kebutuhan media lainnya, silakan kirim
        email ke alamat berikut.
      </p>

      <div className="rounded-2xl border border-neutral-200 bg-white p-8">
        <p className="text-base font-semibold uppercase tracking-wider text-neutral-500">
          Email
        </p>

        <p className="mt-2">
          <Link
            href="mailto:hello@urbanstories.id"
            className="font-semibold text-neutral-900 underline underline-offset-4 transition-colors hover:text-neutral-600"
          >
            hello@urbanstories.id
          </Link>
        </p>
      </div>

      <p>
        Kami akan berusaha merespons setiap pesan secepat mungkin pada hari
        kerja.
      </p>
    </StaticPageLayout>
  );
}