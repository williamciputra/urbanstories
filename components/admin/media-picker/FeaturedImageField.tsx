"use client";

import { useState } from "react";
import MediaPickerModal from "./MediaPickerModal";

export default function FeaturedImageField() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Featured Image
        </label>

        <div className="overflow-hidden rounded-xl border border-gray-300 bg-gray-100">
          <div className="flex aspect-[16/9] items-center justify-center">
            <span className="text-sm text-gray-500">
              No image selected
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Choose Image
        </button>
      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}