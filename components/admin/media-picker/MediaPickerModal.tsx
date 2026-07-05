"use client";

import { useRef, useState } from "react";

import MediaPickerGrid, {
  MediaPickerGridRef,
} from "./MediaPickerGrid";
import UploadButton from "@/components/admin/media/UploadButton";

type Media = {
  id: string;
  path: string;
  publicUrl: string;
  caption: string | null;
};

type MediaPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
};

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  const [selectedMedia, setSelectedMedia] =
    useState<Media | null>(null);

  const [caption, setCaption] =
    useState("");

  const [search, setSearch] =
    useState("");

  const gridRef =
    useRef<MediaPickerGridRef>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="flex h-[88vh] w-full max-w-7xl overflow-hidden rounded-xl bg-white shadow-xl">

        {/* LEFT */}

        <div className="flex w-[68%] flex-col border-r">

          <div className="flex items-center justify-between border-b px-6 py-4">

            <h2 className="text-xl font-semibold text-gray-900">
              Media Library
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
            >
              ✕
            </button>

          </div>

          <div className="p-6">

            <div className="mb-6 flex items-center gap-4">

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search image..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-black"
              />

              <UploadButton
                onUploaded={() => {
                  gridRef.current?.reloadMedia();
                }}
              />

            </div>

            <MediaPickerGrid
              ref={gridRef}
              search={search}
              selectedId={selectedMedia?.id}
              onSelect={(media) => {
                setSelectedMedia(media);
                setCaption(media.caption ?? "");
              }}
            />

          </div>

        </div>

        {/* RIGHT */}

        <aside className="flex w-[32%] flex-col">

          <div className="border-b px-6 py-4">

            <h3 className="text-lg font-semibold text-gray-900">
              Preview Image
            </h3>

          </div>

          <div className="flex-1 overflow-y-auto p-6">

            {selectedMedia ? (
              <>
                <div className="overflow-hidden rounded-lg border">

                  <img
                    src={selectedMedia.publicUrl}
                    alt={selectedMedia.caption ?? "Media Image"}
                    className="aspect-[16/9] w-full object-cover"
                  />

                </div>

                <div className="mt-6">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Filename
                  </label>

                  <input
                    readOnly
                    value={selectedMedia.path}
                    className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900"
                  />

                </div>

                <div className="mt-5">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Caption
                  </label>

                  <textarea
                    rows={4}
                    value={caption}
                    onChange={(e) =>
                      setCaption(e.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black"
                  />

                </div>

              </>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Select an image to preview.
              </div>
            )}

          </div>

          <div className="border-t p-6">

            <button
              type="button"
              disabled={!selectedMedia}
              onClick={async () => {
                if (!selectedMedia) return;

                const res = await fetch(
                  `/api/media/${selectedMedia.id}`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      caption,
                    }),
                  }
                );

                if (!res.ok) {
                  alert("Failed to save image metadata.");
                  return;
                }

                const updatedMedia = await res.json();

                onSelect({
                  id: updatedMedia.id,
                  path: updatedMedia.path,
                  publicUrl: selectedMedia.publicUrl,
                  caption: updatedMedia.caption,
                });

                onClose();
              }}
              className="h-10 w-full rounded-md bg-black text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Use Image
            </button>

          </div>

        </aside>

      </div>

    </div>
  );
}