"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type MediaItem = {
  id: string;
  path: string;
  caption: string | null;
  publicUrl: string;
};

type MediaPickerGridProps = {
  selectedId?: string;
  search?: string;
  onSelect: (media: MediaItem) => void;
};

export type MediaPickerGridRef = {
  reloadMedia: () => Promise<void>;
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

const MediaPickerGrid = forwardRef<
  MediaPickerGridRef,
  MediaPickerGridProps
>(function MediaPickerGrid(
  {
    selectedId,
    search = "",
    onSelect,
  },
  ref
) {
  const [media, setMedia] =
    useState<MediaItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function reloadMedia() {
    try {
      setLoading(true);

      const res = await fetch("/api/media");

      const data = await res.json();

      setMedia(
        data.map((item: MediaItem) => ({
          ...item,
          publicUrl: `${SUPABASE_URL}/storage/v1/object/public/covers/${item.path}`,
        }))
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reloadMedia();
  }, []);

  useImperativeHandle(ref, () => ({
    reloadMedia,
  }));

  const filteredMedia = media.filter(
    (image) => {
      const keyword =
        search.toLowerCase();

      return (
        image.path
          .toLowerCase()
          .includes(keyword) ||
        (image.caption ?? "")
          .toLowerCase()
          .includes(keyword)
      );
    }
  );

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading media...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {filteredMedia.map((image) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onSelect(image)}
          className={`
            overflow-hidden
            rounded-xl
            border
            bg-white
            text-left
            transition

            ${
              selectedId === image.id
                ? "border-black ring-2 ring-black"
                : "border-gray-200 hover:border-black"
            }
          `}
        >
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={image.publicUrl}
              alt={
                image.caption ??
                "Media Image"
              }
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-3">
            <p className="truncate text-sm text-gray-900">
              {image.caption ??
                image.path}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
});

export default MediaPickerGrid;