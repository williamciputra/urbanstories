"use client";

import Link from "next/link";
import Search from "./Search";
import { site } from "../data/site";

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
            Urbanstories
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
            {site.navigation.map((item) => (
              <li key={item}>
                <Link
                  href={`/category/${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-xl text-black transition hover:text-neutral-500"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}