"use client";

import { useEffect, useState } from "react";

import {
    EditorContent,
    useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

import { Embed } from "./extensions/Embed";

import Toolbar from "./Toolbar";

import MediaPickerModal from "@/components/admin/media-picker/MediaPickerModal";
import ArticlePickerModal from "@/components/admin/articles/ArticlePickerModal";

type TipTapEditorProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function TipTapEditor({
    value,
    onChange,
}: TipTapEditorProps) {
    const [imagePickerOpen, setImagePickerOpen] =
        useState(false);

    const [articlePickerOpen, setArticlePickerOpen] =
        useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,

            Image,

            Link.configure({
                openOnClick: false,
                autolink: false,
            }),

            Embed,
        ],

        content: value,

        immediatelyRender: false,

        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (!editor) return;

        if (editor.getHTML() !== value) {
            editor.commands.setContent(value || "");
        }
    }, [editor, value]);

    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="w-[840px] overflow-hidden rounded-lg border border-gray-300 bg-white">

                <Toolbar
                    editor={editor}
                    onInsertImage={() =>
                        setImagePickerOpen(true)
                    }
                    onEmbed={() => {
                        const url = window.prompt(
                            "Paste URL"
                        );

                        if (!url) return;

                        editor
                            .chain()
                            .focus()
                            .setEmbed(url)
                            .run();
                    }}
                    onRelatedArticle={() =>
                        setArticlePickerOpen(true)
                    }
                />

                <EditorContent
                    editor={editor}
                    className="
            h-[620px]
            overflow-y-auto

            [&_.ProseMirror]:min-h-full

            [&_.ProseMirror]:w-full

            [&_.ProseMirror]:box-border
            [&_.ProseMirror]:mx-0

            [&_.ProseMirror]:px-12
            [&_.ProseMirror]:pt-5
            [&_.ProseMirror]:pb-8

            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:text-left

            [&_.ProseMirror]:text-[17px]
            [&_.ProseMirror]:leading-[1.9]
            [&_.ProseMirror]:text-gray-900

            [&_.ProseMirror_p]:my-5

            [&_.ProseMirror_h2]:mt-10
            [&_.ProseMirror_h2]:mb-5
            [&_.ProseMirror_h2]:text-[32px]
            [&_.ProseMirror_h2]:font-bold
            [&_.ProseMirror_h2]:leading-tight

            [&_.ProseMirror_h3]:mt-8
            [&_.ProseMirror_h3]:mb-4
            [&_.ProseMirror_h3]:text-[26px]
            [&_.ProseMirror_h3]:font-semibold

            [&_.ProseMirror_ul]:my-5
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:pl-7

            [&_.ProseMirror_ol]:my-5
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:pl-7

            [&_.ProseMirror_li]:my-2

            [&_.ProseMirror_blockquote]:my-8
            [&_.ProseMirror_blockquote]:border-l-4
            [&_.ProseMirror_blockquote]:border-gray-300
            [&_.ProseMirror_blockquote]:pl-5
            [&_.ProseMirror_blockquote]:italic

            [&_.ProseMirror_img]:my-8
            [&_.ProseMirror_img]:w-full
            [&_.ProseMirror_img]:rounded-lg
          "
                />

            </div>

            <MediaPickerModal
                open={imagePickerOpen}
                onClose={() =>
                    setImagePickerOpen(false)
                }
                onSelect={(media) => {
                    editor
                        .chain()
                        .focus()
                        .insertContent(`
<img
  src="${media.publicUrl}"
  alt="${media.caption ?? "Article Image"}"
  data-media-id="${media.id}"
/>

<p></p>
`)
                        .run();

                    setImagePickerOpen(false);
                }}
            />

            <ArticlePickerModal
                open={articlePickerOpen}
                onClose={() =>
                    setArticlePickerOpen(false)
                }
                onSelect={(article) => {
                    editor
                        .chain()
                        .focus()
                        .toggleBold()
                        .insertContent(
                            `Baca juga: ${article.title}`
                        )
                        .toggleBold()
                        .insertContent("<p></p>")
                        .run();

                    setArticlePickerOpen(false);
                }}
            />
        </>
    );
}