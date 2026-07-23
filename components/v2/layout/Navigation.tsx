"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/data/v2/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8 text-[15px] font-medium text-neutral-700">
        {navigation.map((item) => (
          <li
            key={item.name}
            className="group relative"
          >
            <Link
              href={item.href}
              className={`transition-colors duration-200 hover:text-black ${
                pathname.startsWith(item.href)
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
  );
}