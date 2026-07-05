"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";
import MobileHeader from "./MobileHeader";
import MobileDrawer from "./MobileDrawer";
import { site } from "../data/site";
import { navigation } from "@/data/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-neutral-200 bg-[#FAF8F3] transition-all duration-300 ${isScrolled ? "shadow-sm" : ""
          }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-5">
          <MobileHeader
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />

          <div className="hidden lg:flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-[32px] font-semibold tracking-[-0.04em] text-neutral-900 transition hover:opacity-80">
                  {site.name}
                </h1>
              </Link>

              <p className="mt-1 text-sm text-neutral-600">
                {site.tagline}
              </p>
            </div>

            <nav>
              <ul className="flex items-center gap-8 text-[15px] font-medium text-neutral-700">
                {navigation.map((item) => (
                  <li
                    key={item.name}
                    className="group relative"
                  >
                    <Link
                      href={item.href}
                      className={`transition-colors duration-200 hover:text-black ${pathname.startsWith(item.href)
                          ? "font-semibold text-black"
                          : "text-neutral-700"
                        }`}
                    >
                      {item.name}
                    </Link>

                    {item.children.length > 0 && (
                      <div className="invisible absolute left-0 top-full z-50 mt-3 min-w-[220px] rounded-lg border border-neutral-200 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">

                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2 text-sm text-neutral-700 transition hover:bg-neutral-100 hover:text-black"
                          >
                            {child.name}
                          </Link>
                        ))}

                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <Search compact={false} />
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}