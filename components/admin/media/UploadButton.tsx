"use client";

import { useRef, useState } from "react";

type UploadButtonProps = {
  onUploaded?: () => void;
};

export default function UploadButton({
  onUploaded,
}: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    console.log("[UPLOAD] START");

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    console.log("[UPLOAD] FETCH DONE");

    setUploading(false);

    if (!res.ok) {
      console.log("[UPLOAD] FAILED");
      alert("Upload gagal");
      return;
    }

    const result = await res.json();

    console.log("[UPLOAD] JSON", result);

    window.location.reload();
  }

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        {uploading ? "Uploading..." : "+ Upload Image"}
      </button>
    </>
  );
}