"use client";

import { useState } from "react";

import TipTapEditor from "@/components/admin/editor/TipTapEditor";

export default function TipTapTestPage() {
  const [content, setContent] =
    useState("<p>Hello Urbanstories</p>");

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        TipTap Test
      </h1>

      <TipTapEditor
        value={content}
        onChange={setContent}
      />

      <div className="mt-8 rounded-lg border border-gray-300 p-4">
        <h2 className="mb-2 font-semibold">
          HTML Output
        </h2>

        <pre className="whitespace-pre-wrap text-sm">
          {content}
        </pre>
      </div>
    </main>
  );
}