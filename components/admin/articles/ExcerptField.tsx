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
    <div className="w-[820px] space-y-2">

      <div className="flex items-center justify-between">

        <label
          htmlFor="excerpt"
          className="text-sm font-medium text-gray-900"
        >
          Excerpt
        </label>

        <span className="text-xs text-gray-500">
          Optional
        </span>

      </div>

      <textarea
        id="excerpt"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ringkasan artikel untuk SEO. Kosongkan jika ingin dibuat otomatis dari paragraf pertama."
        className="min-h-[72px] w-full resize-none rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
      />

    </div>
  );
}