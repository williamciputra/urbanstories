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
        const data = await res.json();

        setAuthors(data);

        if (!value && data.length > 0) {
          onChange(data[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAuthors();
  }, []);

  if (loading) {
    return (
      <div className="text-sm text-gray-500">
        Loading authors...
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor="author"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Author
      </label>

      <select
        id="author"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
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