import Link from "next/link";

import Container from "./Container";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-[#FAF8F3]">

            <Container>

                <div className="flex flex-col items-center py-4 text-center lg:py-5">

                    <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                        Urbanstories
                    </h2>

                    <p className="mt-0.5 text-[13px] text-neutral-600 lg:mt-1 lg:text-sm">
                        Cerita yang Menginspirasi
                    </p>

                    <nav className="mt-3 flex flex-wrap items-center justify-center text-sm text-neutral-600">

                        <Link
                            href="/about"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            About Us
                        </Link>

                        <span className="mx-2 text-neutral-400">·</span>

                        <Link
                            href="/redaksi"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            Redaksi
                        </Link>

                        <span className="mx-2 text-neutral-400">·</span>

                        <Link
                            href="/pedoman-media-siber"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            Pedoman Media Siber
                        </Link>

                        <span className="mx-2 text-neutral-400">·</span>

                        <Link
                            href="/disclaimer"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            Disclaimer
                        </Link>

                        <span className="mx-2 text-neutral-400">·</span>

                        <Link
                            href="/privacy-policy"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            Privacy Policy
                        </Link>

                        <span className="mx-2 text-neutral-400">·</span>

                        <Link
                            href="/kontak"
                            className="transition-colors duration-200 hover:text-neutral-900"
                        >
                            Kontak
                        </Link>

                    </nav>

                    <p className="mt-2 text-[10px] text-neutral-500 lg:mt-3 lg:text-[11px]">
                        © 2026 Urbanstories. All rights reserved.
                    </p>

                </div>

            </Container>

        </footer>
    );
}