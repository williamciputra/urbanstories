"use client";

import { useRef, useState } from "react";

export default function UploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!res.ok) {
      alert("Upload gagal");
      return;
    }

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
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        {uploading ? "Uploading..." : "+ Upload Image"}
      </button>
    </>
  );
}