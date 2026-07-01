"use client";

import { useEffect, useState } from "react";

type MediaItem = {
  id: string;
  title: string;
  path: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export default function MediaPickerGrid() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      try {
        const res = await fetch("/api/media");
        const data = await res.json();
        setMedia(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, []);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading media...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {media.map((image) => {
        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/covers/${image.path}`;

        return (
          <button
            key={image.id}
            type="button"
            className="overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:border-black"
          >
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={imageUrl}
                alt={image.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-3">
              <p className="truncate text-sm text-gray-900">
                {image.title}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}