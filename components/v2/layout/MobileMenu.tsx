"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

import { navigation } from "@/data/v2/navigation";
import Search from "./Search";

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const closeMenu = () => {
        setOpen(false);
        setActiveMenu(null);
    };

    return (
        <>
            <button
                type="button"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-900 transition hover:bg-neutral-100 hover:text-black lg:hidden"
            >
                <Menu size={24} />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-[2px] lg:hidden"
                    onClick={closeMenu}
                >
                    <div
                        className="ml-auto flex h-full w-full max-w-[380px] flex-col bg-[#FAF8F3] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-[92px] items-center justify-between border-b border-neutral-200 px-6">

                            <span className="text-[24px] font-bold tracking-[-0.03em] text-neutral-900">
                                Urbanstories
                            </span>

                            <button
                                type="button"
                                aria-label="Close menu"
                                onClick={closeMenu}
                                className="flex h-11 w-11 items-center justify-center rounded-full text-neutral-900 transition hover:bg-neutral-100 hover:text-black"
                            >
                                <X size={24} />
                            </button>

                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-6">

                            <Search />

                            <div className="mt-8">

                                {activeMenu === null ? (
                                    <nav className="space-y-2">

                                        {navigation.map((item, index) => (
                                            <button
                                                key={item.name}
                                                type="button"
                                                onClick={() => {
                                                    if (item.children.length === 0) {
                                                        window.location.href = item.href;
                                                        return;
                                                    }

                                                    setActiveMenu(index);
                                                }}
                                                className="flex min-h-[56px] w-full items-center justify-between border-b border-neutral-200 py-4 text-left text-[20px] font-semibold text-neutral-900 transition hover:text-black"
                                            >
                                                <span>{item.name}</span>

                                                {item.children.length > 0 && (
                                                    <ChevronRight size={20} />
                                                )}
                                            </button>
                                        ))}

                                    </nav>
                                ) : (
                                    <>

                                        <button
                                            type="button"
                                            onClick={() => setActiveMenu(null)}
                                            className="mb-6 flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-neutral-900"
                                        >
                                            <ChevronLeft size={18} />
                                            Kembali
                                        </button>

                                        <nav className="space-y-2">

                                            {navigation[activeMenu].children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    onClick={closeMenu}
                                                    className="block min-h-[56px] border-b border-neutral-200 py-4 text-[18px] font-medium text-neutral-800 transition hover:text-black"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}

                                        </nav>

                                    </>
                                )}

                            </div>

                        </div>

                    </div>
                </div>
            )}
        </>
    );
}