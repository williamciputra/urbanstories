"use client";

import { useEffect, useState } from "react";

type Author = {
  id: string;
  name: string;
};

type AuthorFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function AuthorField({
  value,
  onChange,
}: AuthorFieldProps) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthors() {
      try {
        const res = await fetch("/api/authors");
        const data: Author[] = await res.json();

        setAuthors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAuthors();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (value) return;

    if (authors.length > 0) {
      onChange(authors[0].id);
    }
  }, [loading, authors, value, onChange]);

  if (loading) return null;

  return (
    <div>
      <label
        htmlFor="author"
        className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
      >
        Author
      </label>

      <select
        id="author"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-[150px] rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-black appearance-none outline-none focus:border-black"
      >
        {authors.map((author) => (
          <option
            key={author.id}
            value={author.id}
          >
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
}