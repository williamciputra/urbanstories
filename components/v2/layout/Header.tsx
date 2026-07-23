"use client";

import { useEffect, useState } from "react";

import Container from "./Container";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Search from "./Search";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 80);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 border-b border-neutral-200 bg-[#FAF8F3] transition-all duration-300 ${isScrolled ? "shadow-sm" : ""
                }`}
        >
            <Container>
                <div className="flex h-[92px] items-center">

                    <div className="w-[220px] shrink-0">
                        <Logo />
                    </div>

                    <div className="ml-8 flex w-[860px] items-center justify-between">

                        <div className="hidden lg:block">
                            <Navigation />
                        </div>

                        <div className="hidden lg:block">
                            <Search />
                        </div>

                    </div>

                    <div className="ml-auto lg:hidden">
                        <MobileMenu />
                    </div>

                </div>
            </Container>
        </header>
    );
}