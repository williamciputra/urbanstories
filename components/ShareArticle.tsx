"use client";

import { useState } from "react";

export default function ShareArticle() {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <section className="mt-24 border-t border-neutral-300 pt-12">

      <h2 className="text-3xl font-bold text-neutral-900">
        Bagikan Artikel
      </h2>

      <button
        onClick={copyLink}
  className="mt-8 inline-flex items-center rounded-full border border-black px-6 py-3 text-black font-medium transition-all duration-200 hover:bg-black hover:text-white"
>
  {copied ? "✓ Link berhasil disalin" : "📋 Copy Link"}
      </button>

    </section>
  );
}