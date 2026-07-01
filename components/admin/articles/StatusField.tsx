"use client";

export type ArticleStatus =
  | "draft"
  | "scheduled"
  | "published"
  | "archived";

type StatusFieldProps = {
  value: ArticleStatus;
  onChange: (value: ArticleStatus) => void;
};

export default function StatusField({
  value,
  onChange,
}: StatusFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700"
      >
        Status
      </label>

      <select
        id="status"
        value={value}
        onChange={(e) =>
          onChange(e.target.value as ArticleStatus)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
      >
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
        <option value="published">Published</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  );
}