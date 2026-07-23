import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export default function SocialWidget() {
  return (
    <div className="ml-auto w-[280px]">

      <section className="rounded-xl border border-neutral-200 bg-white p-4">

        <h2 className="mb-4 text-sm font-bold tracking-[0.08em] text-neutral-900">
          Ikuti Kami
        </h2>

        <div className="flex items-center justify-between">

          <Link
            href="#"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <FaFacebookF size={16} />
          </Link>

          <Link
            href="#"
            aria-label="X"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <FaXTwitter size={16} />
          </Link>

          <Link
            href="#"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <FaInstagram size={16} />
          </Link>

          <Link
            href="#"
            aria-label="YouTube"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <FaYoutube size={16} />
          </Link>

          <Link
            href="#"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900"
          >
            <FaTiktok size={16} />
          </Link>

        </div>

      </section>

    </div>
  );
}