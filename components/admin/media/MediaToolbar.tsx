import UploadButton from "./UploadButton";

export default function MediaToolbar() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <input
        type="text"
        placeholder="Search image..."
        className="w-80 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <UploadButton />
    </div>
  );
}