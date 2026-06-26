"use client";

import { Menu } from "lucide-react";
import { site } from "../data/site";

interface MobileHeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileHeader({
    isMenuOpen,
    setIsMenuOpen,
}: MobileHeaderProps) {
    return (
        <div className="flex items-center justify-between lg:hidden">
            <h1 className="text-3xl font-semibold tracking-[-0.05em] text-neutral-900">
                {site.name}
            </h1>

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-[70] rounded-md p-2 transition hover:bg-neutral-100"
                aria-label="Open menu"
            >
                <Menu size={28} strokeWidth={2} />
            </button>
        </div>
    );
}