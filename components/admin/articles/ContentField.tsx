"use client";

import TipTapEditor from "@/components/admin/editor/TipTapEditor";

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
      <div className="mb-2 flex w-[840px] items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Content
        </label>

        <span className="text-xs text-gray-500">Required
        </span>
      </div>

      <TipTapEditor
        value={value}
        onChange={onChange}
      />
    </div>
  );
}