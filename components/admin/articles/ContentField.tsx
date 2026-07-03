"use client";

type ContentFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ContentField({
  value,
  onChange,
}: ContentFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="content"
          className="text-sm font-medium text-gray-700"
        >
          Content
        </label>

        <span className="text-xs text-gray-500">
          Required
        </span>
      </div>

      <textarea
        id="content"
        rows={18}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Mulai menulis artikel..."
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 outline-none focus:border-black"
      />

      <p className="text-xs text-gray-500">
        Editor sementara. Nanti akan diganti dengan TipTap.
      </p>
    </div>
  );
}