"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import MediaPickerModal from "./MediaPickerModal";

type Media = {
  id: string;
  path: string;
  caption: string | null;
};

type FeaturedImageFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function FeaturedImageField({
  value,
  onChange,
}: FeaturedImageFieldProps) {
  const [open, setOpen] = useState(false);

  const [media, setMedia] =
    useState<Media | null>(null);

  useEffect(() => {
    if (!value) {
      setMedia(null);
      return;
    }

    async function loadMedia() {
      const res = await fetch(`/api/media/${value}`);
      const data = await res.json();

      setMedia(data);

    }

    loadMedia();
  }, [value]);

  return (
    <>
      <div className="space-y-2">

        <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Featured Image
        </label>

        <div className="w-[280px]">

          <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-gray-300 bg-gray-100">

            {media ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${media.path}`}
                alt={media.caption ?? "Featured Image"}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                No image selected
              </div>
            )}

          </div>

          {media && (
            <p className="mt-2 text-xs italic text-gray-500">
              {media.caption ?? "No caption"}
            </p>
          )}

          <div className="mt-3 flex gap-2">

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="h-9 rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              {media ? "Change Image" : "Choose Image"}
            </button>

            {media && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="h-9 rounded-md border border-red-300 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Remove
              </button>
            )}

          </div>

        </div>

      </div>

      <MediaPickerModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(selected) => {
          setMedia({
            id: selected.id,
            path: selected.path,
            caption: selected.caption,
          });

          onChange(selected.id);

          setOpen(false);
        }}
      />
    </>
  );
}