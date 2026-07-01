import MediaGrid from "@/components/admin/media/MediaGrid";
import MediaToolbar from "@/components/admin/media/MediaToolbar";

export default function MediaPage() {
  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Media Library</h1>

      <MediaToolbar />

      <MediaGrid />
    </main>
  );
}