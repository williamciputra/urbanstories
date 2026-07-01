import { createClient } from "@/lib/supabase/server";

type MediaCardProps = {
  title: string;
  path?: string;
};

export default async function MediaCard({
  title,
  path,
}: MediaCardProps) {
  let imageUrl: string | null = null;

  if (path) {
    const supabase = await createClient();

    const { data } = supabase.storage
      .from("covers")
      .getPublicUrl(path);

    imageUrl = data.publicUrl;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="aspect-[4/3] overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium">{title}</p>
      </div>
    </div>
  );
}