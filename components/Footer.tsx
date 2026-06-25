import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-neutral-300 bg-[#FAF8F3]">
      <div className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-5xl font-semibold tracking-[-0.04em] text-neutral-900">
          Urbanstories
        </h2>

        <p className="mt-4 text-lg text-neutral-600">
          Cerita yang Menginspirasi
        </p>

        <div className="mt-14 grid gap-12 md:grid-cols-2">

          <div>

            <h3 className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              Explore
            </h3>

            <ul className="mt-6 space-y-3 text-neutral-700">

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  Advertise
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  Newsletter
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-xs uppercase tracking-[0.35em] text-neutral-500">
              Follow
            </h3>

            <ul className="mt-6 space-y-3 text-neutral-700">

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  LinkedIn
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  X
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="transition hover:text-black"
                >
                  YouTube
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="mt-16 border-t border-neutral-200 pt-8">

          <p className="text-sm text-neutral-500">
            © 2026 Urbanstories. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}