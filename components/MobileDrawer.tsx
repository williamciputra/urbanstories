"use client";

import Link from "next/link";

import Search from "./Search";

import { site } from "../data/site";
import { navigation } from "@/data/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] lg:hidden">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-screen w-80 max-w-[85vw] overflow-y-auto bg-white p-8 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-black">
            {site.name}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl leading-none text-black transition hover:text-neutral-500"
            aria-label="Close menu"
          >
            ×
          </button>

        </div>

        <div className="mt-8">
          <Search />
        </div>

        <nav className="mt-10">

          <ul className="space-y-6">

            {navigation.map((item) => (
              <li key={item.name}>

                <Link
                  href={item.href}
                  onClick={onClose}
                  className="text-xl font-medium text-black transition hover:text-neutral-500"
                >
                  {item.name}
                </Link>

                {item.children.length > 0 && (
                  <ul className="mt-3 ml-4 space-y-2">

                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block text-sm text-neutral-600 transition hover:text-black"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}

                  </ul>
                )}

              </li>
            ))}

          </ul>

        </nav>

      </div>

    </div>
  );
}