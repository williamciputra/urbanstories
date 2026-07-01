"use client";

type ExcerptFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ExcerptField({
  value,
  onChange,
}: ExcerptFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="excerpt"
          className="text-sm font-medium text-gray-700"
        >
          Excerpt
        </label>

        <span className="text-xs text-gray-500">
          Optional
        </span>
      </div>

      <textarea
        id="excerpt"
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tulis ringkasan singkat untuk SEO. Jika dibiarkan kosong, Urbanstories akan otomatis mengisinya dari paragraf pertama."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
      />

      <p className="text-xs text-gray-500">
        Biarkan kosong untuk membuat kutipan secara otomatis dari paragraf pertama saat menerbitkan.
      </p>
    </div>
  );
}