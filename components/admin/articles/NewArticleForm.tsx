"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import CategoryFields from "./CategoryFields";
import AuthorField from "./AuthorField";
import ExcerptField from "./ExcerptField";
import ContentField from "./ContentField";
import TagsField from "./TagsField";
import ScheduleField from "./ScheduleField";
import PublishDateField from "./PublishDateField";
import { ArticleStatus } from "./StatusField";

import FeaturedImageField from "@/components/admin/media-picker/FeaturedImageField";
import {
  createArticle,
  updateArticle,
} from "@/services/articles";

import { slugify } from "@/lib/utils/slugify";

type InitialArticle = {
  id: string;

  title: string;
  excerpt: string;
  content: string;

  status: ArticleStatus;

  author_id: string | null;
  category_id: string | null;
  subcategory_id: string | null;

  cover_image_id: string | null;

  tags: string[];

  is_top_story: boolean;
  is_must_read: boolean;
};

type NewArticleFormProps = {
  mode?: "create" | "edit";
  initialData?: InitialArticle;
};

export default function NewArticleForm({
  mode = "create",
  initialData,
}: NewArticleFormProps) {
  const [title, setTitle] = useState("");

  const [excerpt, setExcerpt] =
    useState("");

  const [content, setContent] =
    useState("");

  const [tags, setTags] =
    useState("");

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

  const [isTopStory, setIsTopStory] =
    useState(false);

  const [isMustRead, setIsMustRead] =
    useState(false);

  const [publishDate, setPublishDate] =
    useState("");

  const [publishTime, setPublishTime] =
    useState("");

  const [scheduleDate, setScheduleDate] =
    useState("");

  const [scheduleTime, setScheduleTime] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [showSchedule, setShowSchedule] =
    useState(false);

  const [showPublishDate, setShowPublishDate] =
    useState(false);

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title);
    setExcerpt(initialData.excerpt);
    setContent(initialData.content);

    setStatus(initialData.status);

    setAuthorId(initialData.author_id ?? "");
    setCategoryId(initialData.category_id ?? "");
    setSubcategoryId(
      initialData.subcategory_id ?? ""
    );
    setCoverImageId(
      initialData.cover_image_id ?? ""
    );

    setTags(
      initialData.tags.join(", ")
    );

    setIsTopStory(
      initialData.is_top_story ?? false
    );

    setIsMustRead(
      initialData.is_must_read ?? false
    );
  }, [initialData]);

  const slug = useMemo(
    () => slugify(title),
    [title]
  );

  const router = useRouter();

  async function handleSaveDraft() {
    if (saving) return;

    try {
      setSaving(true);

      if (mode === "edit" && initialData) {
        const payload = {
          title,
          slug,

          excerpt,
          content,

          category_id: categoryId || null,
          subcategory_id: subcategoryId || null,

          author_id: authorId || null,

          cover_image_id: coverImageId || null,

          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),

          is_top_story: isTopStory,
          is_must_read: isMustRead,

          status: "draft" as const,
        };

        await updateArticle(
          initialData.id,
          payload
        );

        toast.success("Draft updated.");

        router.push("/admin/articles");
        router.refresh();

        return;
      }

      const payload = {
        title,
        slug,

        excerpt,
        content,

        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,

        author_id: authorId || null,

        cover_image_id: coverImageId || null,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        is_top_story: isTopStory,
        is_must_read: isMustRead,

        status: "draft" as const,

        published_at: null,
      };

      await createArticle(payload);

      toast.success("Draft saved.");

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error(
          "Failed to save draft."
        );

        toast.error(
          "Failed to save draft."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (saving) return;

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (!authorId) {
      toast.error("Please select an author.");
      return;
    }

    const plainText = content
      .replace(/<[^>]*>/g, "")
      .trim();

    if (!plainText) {
      toast.error("Article content is required.");
      return;
    }

    try {
      setSaving(true);

      if (mode === "edit" && initialData) {
        const payload = {
          title,
          slug,

          excerpt,
          content,

          category_id: categoryId || null,
          subcategory_id: subcategoryId || null,

          author_id: authorId || null,

          cover_image_id: coverImageId || null,

          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),

          is_top_story: isTopStory,
          is_must_read: isMustRead,

          status: "published" as const,
        };

        await updateArticle(
          initialData.id,
          payload
        );

        toast.success("Article updated.");

        router.push("/admin/articles");
        router.refresh();

        return;
      }

      const payload = {
        title,
        slug,

        excerpt,
        content,

        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,

        author_id: authorId || null,

        cover_image_id: coverImageId || null,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        is_top_story: isTopStory,
        is_must_read: isMustRead,

        status: "published" as const,

        published_at: new Date().toISOString(),
      };

      await createArticle(payload);

      toast.success("Article published.");

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error(
          "Failed to publish article."
        );

        toast.error(
          "Failed to publish article."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleSchedule() {
    if (saving) return;

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (!authorId) {
      toast.error("Please select an author.");
      return;
    }

    const plainText = content
      .replace(/<[^>]*>/g, "")
      .trim();

    if (!plainText) {
      toast.error("Article content is required.");
      return;
    }

    if (!scheduleDate || !scheduleTime) {
      toast.error(
        "Please select publish date and time."
      );
      return;
    }

    try {
      setSaving(true);

      const publishedAt = new Date(
        `${scheduleDate}T${scheduleTime}:00`
      ).toISOString();

      if (mode === "edit" && initialData) {
        const payload = {
          title,
          slug,

          excerpt,
          content,

          category_id: categoryId || null,
          subcategory_id: subcategoryId || null,

          author_id: authorId || null,

          cover_image_id: coverImageId || null,

          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),

          is_top_story: isTopStory,
          is_must_read: isMustRead,

          status: "scheduled" as const,

          published_at: publishedAt,
        };

        await fetch(`/api/articles/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        toast.success("Article scheduled.");

        router.push("/admin/articles");
        router.refresh();

        return;
      }

      const payload = {
        title,
        slug,

        excerpt,
        content,

        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,

        author_id: authorId || null,

        cover_image_id: coverImageId || null,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        is_top_story: isTopStory,
        is_must_read: isMustRead,

        status: "scheduled" as const,

        published_at: publishedAt,
      };

      await createArticle(payload);

      toast.success("Article scheduled.");

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to schedule article."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handlePublishWithDate() {
    if (saving) return;

    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    if (!authorId) {
      toast.error("Please select an author.");
      return;
    }

    const plainText = content
      .replace(/<[^>]*>/g, "")
      .trim();

    if (!plainText) {
      toast.error("Article content is required.");
      return;
    }

    if (!publishDate || !publishTime) {
      toast.error(
        "Please select publish date and time."
      );
      return;
    }

    try {
      setSaving(true);

      const publishedAt = new Date(
        `${publishDate}T${publishTime}:00`
      ).toISOString();

      if (mode === "edit" && initialData) {
        const payload = {
          title,
          slug,

          excerpt,
          content,

          category_id: categoryId || null,
          subcategory_id: subcategoryId || null,

          author_id: authorId || null,

          cover_image_id: coverImageId || null,

          tags: tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),

          is_top_story: isTopStory,
          is_must_read: isMustRead,

          status: "published" as const,

          published_at: publishedAt,
        };

        await fetch(`/api/articles/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        toast.success("Publish date updated.");

        router.push("/admin/articles");
        router.refresh();

        return;
      }

      const payload = {
        title,
        slug,

        excerpt,
        content,

        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,

        author_id: authorId || null,

        cover_image_id: coverImageId || null,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        is_top_story: isTopStory,
        is_must_read: isMustRead,

        status: "published" as const,

        published_at: publishedAt,
      };

      await createArticle(payload);

      toast.success("Article published.");

      router.push("/admin/articles");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to publish article."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  console.log("FORM STATE", {
    categoryId,
    subcategoryId,
    authorId,
    coverImageId,
  });

  return (
    <div className="w-full space-y-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="max-w-3xl">

        <label
          htmlFor="title"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          Title
        </label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title..."
          className="
    h-9
    w-full
    rounded-md
    border
    border-gray-300
    bg-white
    px-3

    text-sm
    font-medium
    text-gray-900

    placeholder:text-gray-400

    outline-none
    transition-colors

    focus:border-black
    focus:ring-0
  "
        />

      </div>

      <div className="max-w-2xl">

        <label
          htmlFor="slug"
          className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500"
        >
          Slug
        </label>

        <input
          id="slug"
          type="text"
          readOnly
          value={slug}
          className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600"
        />

      </div>

      <div className="flex items-end gap-4">

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

      </div>

      <div className="max-w-xs pt-1">
        <FeaturedImageField
          value={coverImageId}
          onChange={setCoverImageId}
        />
      </div>

      <div className="max-w-3xl pt-1">
        <ExcerptField
          value={excerpt}
          onChange={setExcerpt}
        />
      </div>

      <div className="pt-1">
        <ContentField
          value={content}
          onChange={setContent}
        />
      </div>

      <div className="w-[840px] pt-2">

        <TagsField
          value={tags}
          onChange={setTags}
        />

      </div>

      <div className="flex w-[840px] items-center gap-8 rounded-md border border-gray-200 px-4 py-2">

        <label className="flex items-center gap-3">

          <input
            id="top-story"
            type="checkbox"
            checked={isTopStory}
            onChange={(e) =>
              setIsTopStory(e.target.checked)
            }
            className="h-4 w-4"
          />

          <span className="text-sm font-medium text-gray-800">
            Set as Top Story
          </span>

        </label>

        <label className="flex items-center gap-3">

          <input
            id="must-read"
            type="checkbox"
            checked={isMustRead}
            onChange={(e) =>
              setIsMustRead(e.target.checked)
            }
            className="h-4 w-4"
          />

          <span className="text-sm font-medium text-gray-800">
            Set as Must Read
          </span>

        </label>

      </div>

      {showPublishDate && (
        <PublishDateField
          date={publishDate}
          time={publishTime}
          onDateChange={setPublishDate}
          onTimeChange={setPublishTime}
        />
      )}

      {showSchedule && (
        <ScheduleField
          date={scheduleDate}
          time={scheduleTime}
          onDateChange={setScheduleDate}
          onTimeChange={setScheduleTime}
        />
      )}

      <div className="flex w-[840px] justify-end gap-2 border-t border-gray-200 pt-4">

        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={saving}
          className="rounded-lg border border-gray-300 bg-white px-6 h-9 font-medium text-gray-900 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() => {
            if (!showSchedule) {
              setPublishDate("");
              setPublishTime("");

              setShowPublishDate(false);
              setShowSchedule(true);

              return;
            }

            handleSchedule();
          }}
          className="rounded-lg border border-gray-300 bg-white px-6 h-9 font-medium text-gray-900 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {saving
            ? "Scheduling..."
            : showSchedule
              ? "Confirm Schedule"
              : "Schedule"}
        </button>

        <button
          type="button"
          disabled={saving}
          onClick={() => {
            if (!showPublishDate) {
              setScheduleDate("");
              setScheduleTime("");

              setShowSchedule(false);
              setShowPublishDate(true);

              return;
            }

            handlePublishWithDate();
          }}
          className="rounded-lg border border-gray-300 bg-white px-6 h-9 font-medium text-gray-900 transition hover:bg-gray-50 disabled:opacity-50"
        >
          {saving
            ? "Publishing..."
            : showPublishDate
              ? "Confirm Publish Date"
              : "Publish Date"}
        </button>

        <button
          type="button"
          onClick={handlePublish}
          disabled={saving}
          className="h-9 rounded-md bg-black px-5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
        >
          {saving
            ? mode === "edit"
              ? "Saving..."
              : "Publishing..."
            : mode === "edit"
              ? "Save"
              : "Publish"}
        </button>

      </div>

    </div>
  );
}