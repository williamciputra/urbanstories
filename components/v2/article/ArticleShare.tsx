"use client";

import { useState } from "react";

import {
    siFacebook,
    siWhatsapp,
    siX,
} from "simple-icons/icons";

type ArticleShareProps = {
    title: string;
    url: string;
};

type BrandIconProps = {
    path: string;
    label: string;
};

function BrandIcon({
    path,
    label,
}: BrandIconProps) {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <title>{label}</title>

            <path d={path} />
        </svg>
    );
}

export default function ArticleShare({
    title,
    url,
}: ArticleShareProps) {

    const [copied, setCopied] = useState(false);

    async function copyLink() {

        try {

            await navigator.clipboard.writeText(url);

            setCopied(true);

            setTimeout(
                () => setCopied(false),
                2000
            );

        } catch (error) {

            console.error(error);

        }

    }

    async function nativeShare() {

        if (navigator.share) {

            try {

                await navigator.share({
                    title,
                    url,
                });

                return;

            } catch {

                return;

            }

        }

        copyLink();

    }

    function popup(shareUrl: string) {

        window.open(
            shareUrl,
            "_blank",
            "width=600,height=600"
        );

    }

    return (
        <>
            {/* Mobile */}

            <div className="lg:hidden">

                <button
                    type="button"
                    aria-label="Share Article"
                    onClick={nativeShare}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >

                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />

                        <path d="M8.6 10.7 15.4 6.3" />
                        <path d="M8.6 13.3 15.4 17.7" />
                    </svg>

                </button>

            </div>

            {/* Desktop */}

            <div className="hidden items-center gap-5 text-neutral-600 lg:flex">

                <button
                    type="button"
                    aria-label="Share to Facebook"
                    onClick={() =>
                        popup(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                url
                            )}`
                        )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >
                    <BrandIcon
                        path={siFacebook.path}
                        label="Facebook"
                    />
                </button>

                <button
                    type="button"
                    aria-label="Share to X"
                    onClick={() =>
                        popup(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                url
                            )}&text=${encodeURIComponent(
                                title
                            )}`
                        )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >
                    <BrandIcon
                        path={siX.path}
                        label="X"
                    />
                </button>

                <button
                    type="button"
                    aria-label="Share to WhatsApp"
                    onClick={() =>
                        popup(
                            `https://wa.me/?text=${encodeURIComponent(
                                `${title} ${url}`
                            )}`
                        )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >
                    <BrandIcon
                        path={siWhatsapp.path}
                        label="WhatsApp"
                    />
                </button>

                <button
                    type="button"
                    aria-label="Copy Link"
                    onClick={copyLink}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-neutral-900"
                >
                    {copied ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                        >
                            <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
                            <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
                        </svg>
                    )}
                </button>

            </div>
        </>
    );
}