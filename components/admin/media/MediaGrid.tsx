import MediaCard from "./MediaCard";
import { getMedia } from "@/services/media";

export default async function MediaGrid() {
  const media = await getMedia();

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {media.map((image) => (
        <MediaCard
          key={image.id}
          title={image.title}
          path={image.path}
        />
      ))}
    </div>
  );
}