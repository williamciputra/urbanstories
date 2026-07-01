import { getMedia } from "@/services/media";

export default async function MediaPickerContent() {
  const media = await getMedia();

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {media.map((image) => (
        <div
          key={image.id}
          className="rounded-xl border border-gray-200 bg-white p-3"
        >
          <p className="truncate text-sm text-gray-900">
            {image.title}
          </p>
        </div>
      ))}
    </div>
  );
}