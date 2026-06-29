import Link from "next/link";

const footerLinks = [
  { name: "About Us", href: "/about" },
  { name: "Redaksi", href: "/redaksi" },
  { name: "Pedoman Media Siber", href: "/pedoman-media-siber" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Kontak", href: "/kontak" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-300 bg-[#FAF8F3]">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center">

        <Link href="/">
          <h2 className="text-5xl font-semibold tracking-[-0.04em] text-neutral-900 transition hover:opacity-80">
            Urbanstories
          </h2>
        </Link>

        <p className="mt-4 text-lg text-neutral-600">
          Cerita yang Menginspirasi
        </p>

        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">

          {footerLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-neutral-600 transition hover:text-black"
            >
              {item.name}
            </Link>
          ))}

        </nav>

        <div className="mt-10 border-t border-neutral-200 pt-6">

          <p className="text-sm text-neutral-500">
            © 2026 Urbanstories. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}