"use client";

import { useRef, useState } from "react";

import MobileStoryCard from "./MobileStoryCard";

import type { HomepageArticle } from "@/services/public/articles";

type MobileHeroCarouselProps = {
    topStory: HomepageArticle | null;
    latestHeadlines: HomepageArticle[];
};

export default function MobileHeroCarousel({
    topStory,
    latestHeadlines,
}: MobileHeroCarouselProps) {

    const slides: HomepageArticle[] = [
        ...(topStory ? [topStory] : []),
        ...latestHeadlines.slice(0, 4),
    ];

    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    if (!slides.length) return null;

    const handleScroll = () => {

        if (!scrollRef.current) return;

        const { scrollLeft, clientWidth } = scrollRef.current;

        const index = Math.round(scrollLeft / clientWidth);

        setActiveIndex(index);
    };

    return (
        <section className="lg:hidden">

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="
    flex
    overflow-x-auto
    snap-x
    snap-mandatory
    scroll-smooth
    overscroll-x-contain
    [-ms-overflow-style:none]
    [scrollbar-width:none]
    [&::-webkit-scrollbar]:hidden
"
            >

                {slides.map((article) => (

                    <div
                        key={article.id}
                        className="min-w-full snap-start px-4"
                    >

                        <MobileStoryCard
                            article={article}
                        />

                    </div>

                ))}

            </div>

            <div className="mt-5 flex justify-center gap-2">

                {slides.map((article, index) => (

                    <span
                        key={article.id}
                        className={`h-2 w-2 rounded-full transition-colors ${index === activeIndex
                            ? "bg-neutral-900"
                            : "bg-neutral-300"
                            }`}
                    />

                ))}

            </div>

        </section>
    );
}