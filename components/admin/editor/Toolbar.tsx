"use client";

import { Editor } from "@tiptap/react";

import {
    Bold,
    Italic,
    Underline,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    ImagePlus,
    Globe,
    Newspaper,
} from "lucide-react";

type ToolbarProps = {
    editor: Editor;
    onInsertImage: () => void;
    onEmbed: () => void;
    onRelatedArticle: () => void;
};

function buttonClass(active: boolean) {
    return `
    flex h-9 w-9 items-center justify-center
    rounded-md
    border
    transition-colors

    ${active
            ? "border-black bg-black text-white"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
        }
  `;
}

export default function Toolbar({
    editor,
    onInsertImage,
    onEmbed,
    onRelatedArticle,
}: ToolbarProps) {
    return (
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 p-2">

            <button
                type="button"
                title="Bold"
                onClick={() =>
                    editor.chain().focus().toggleBold().run()
                }
                className={buttonClass(
                    editor.isActive("bold")
                )}
            >
                <Bold size={16} strokeWidth={1.8} />
            </button>

            <button
                type="button"
                title="Italic"
                onClick={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                className={buttonClass(
                    editor.isActive("italic")
                )}
            >
                <Italic size={16} strokeWidth={1.8} />
            </button>

            <button
                type="button"
                title="Underline"
                onClick={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
                className={buttonClass(
                    editor.isActive("underline")
                )}
            >
                <Underline size={16} strokeWidth={1.8} />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            <button
                type="button"
                title="Heading 2"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: 2 })
                        .run()
                }
                className={buttonClass(
                    editor.isActive("heading", {
                        level: 2,
                    })
                )}
            >
                <Heading2 size={16} strokeWidth={1.8} />
            </button>

            <button
                type="button"
                title="Heading 3"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleHeading({ level: 3 })
                        .run()
                }
                className={buttonClass(
                    editor.isActive("heading", {
                        level: 3,
                    })
                )}
            >
                <Heading3 size={16} strokeWidth={1.8} />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            <button
                type="button"
                title="Bullet List"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleBulletList()
                        .run()
                }
                className={buttonClass(
                    editor.isActive("bulletList")
                )}
            >
                <List size={16} strokeWidth={1.8} />
            </button>

            <button
                type="button"
                title="Number List"
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleOrderedList()
                        .run()
                }
                className={buttonClass(
                    editor.isActive("orderedList")
                )}
            >
                <ListOrdered size={16} strokeWidth={1.8} />
            </button>

            <div className="mx-1 h-6 w-px bg-gray-300" />

            <button
                type="button"
                title="Insert Image"
                onClick={onInsertImage}
                className={buttonClass(false)}
            >
                <ImagePlus size={16} />
            </button>

            <button
                type="button"
                title="Embed"
                onClick={onEmbed}
                className={buttonClass(false)}
            >
                <Globe size={16} strokeWidth={1.8} />
            </button>

            <button
                type="button"
                title="Baca juga"
                onClick={onRelatedArticle}
                className={buttonClass(false)}
            >
                <Newspaper size={16} strokeWidth={1.8} />
            </button>

        </div>
    );
}