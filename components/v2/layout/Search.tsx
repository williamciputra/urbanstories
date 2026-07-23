"use client";

import { Search as SearchIcon } from "lucide-react";

type SearchProps = {
    compact?: boolean;
};

export default function Search({
    compact = false,
}: SearchProps) {
    return (
        <form
            role="search"
            className={`flex h-11 items-center rounded-full border border-neutral-300 bg-white transition-colors duration-200 focus-within:border-neutral-900 w-full lg:${compact ? "w-[220px]" : "w-[260px]"
                }`}
        >
            <SearchIcon
                size={18}
                className="ml-4 shrink-0 text-neutral-500"
            />

            <input
                type="search"
                placeholder="Cari artikel..."
                className="h-full w-full bg-transparent px-3 pr-4 text-[14px] text-neutral-900 outline-none placeholder:text-neutral-400"
            />
        </form>
    );
}