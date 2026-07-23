import Link from "next/link";

import { site } from "@/data/v2/site";

export default function Logo() {
  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="block"
      >
        <h1 className="text-[32px] font-semibold tracking-[-0.04em] leading-none text-neutral-900 transition hover:opacity-80">
          {site.name}
        </h1>

        <p className="mt-1 text-[13px] leading-none text-neutral-600">
          {site.tagline}
        </p>
      </Link>
    </div>
  );
}