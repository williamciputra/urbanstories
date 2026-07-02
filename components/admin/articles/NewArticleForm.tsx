"use client";

import { useMemo, useState } from "react";

import CategoryFields from "./CategoryFields";
import AuthorField from "./AuthorField";
import ExcerptField from "./ExcerptField";
import ScheduleField from "./ScheduleField";
import StatusField, { ArticleStatus } from "./StatusField";

import FeaturedImageField from "@/components/admin/media-picker/FeaturedImageField";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewArticleForm() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const [status, setStatus] =
    useState<ArticleStatus>("draft");

  const [authorId, setAuthorId] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [subcategoryId, setSubcategoryId] =
    useState("");

  const [coverImageId, setCoverImageId] =
    useState("");

  const [publishDate, setPublishDate] =
    useState("");

  const [publishTime, setPublishTime] =
    useState("");

  const slug = useMemo(
    () => slugify(title),
    [title]
  );

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-black"
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Slug
        </label>

        <input
          id="slug"
          type="text"
          value={slug}
          readOnly
          className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-base text-gray-700"
        />
      </div>

      <CategoryFields
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        onCategoryChange={setCategoryId}
        onSubcategoryChange={setSubcategoryId}
      />

      <AuthorField
        value={authorId}
        onChange={setAuthorId}
      />

      <FeaturedImageField
        value={coverImageId}
        onChange={setCoverImageId}
      />

      <ExcerptField
        value={excerpt}
        onChange={setExcerpt}
      />

      <StatusField
        value={status}
        onChange={setStatus}
      />

      {status === "scheduled" && (
        <ScheduleField
          date={publishDate}
          time={publishTime}
          onDateChange={setPublishDate}
          onTimeChange={setPublishTime}
        />
      )}

    </div>
  );
}