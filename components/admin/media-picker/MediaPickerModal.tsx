"use client";

import MediaPickerGrid from "./MediaPickerGrid";

type MediaPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (media: {
    id: string;
    title: string;
    path: string;
  }) => void;
};

export default function MediaPickerModal({
  open,
  onClose,
  onSelect,
}: MediaPickerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
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

        <div className="overflow-y-auto p-6">
          <input
            type="text"
            placeholder="Search image..."
            className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
          />

          <MediaPickerGrid
            onSelect={(media) => {
              onSelect(media);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}