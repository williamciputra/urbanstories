"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;

      const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const value =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 100
          : 0;

      setProgress(Math.min(value, 100));
    }

    updateProgress();

    window.addEventListener("scroll", updateProgress);

    return () =>
      window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[2px] bg-transparent">

      <div
        className="h-full bg-neutral-900 transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />

    </div>
  );
}