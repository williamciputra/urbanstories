"use client";

import { useEffect, useMemo, useState } from "react";

type Tag = {
    id: string;
    name: string;
};

type TagsFieldProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function TagsField({
    value,
    onChange,
}: TagsFieldProps) {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState<string[]>([]);

    // load semua tag dari database
    useEffect(() => {
        async function loadTags() {
            const res = await fetch("/api/tags");

            if (!res.ok) return;

            const data = await res.json();

            setAllTags(data);
        }

        loadTags();
    }, []);

    // sync value dari parent
    useEffect(() => {
        setSelected(
            value
                ? value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                : []
        );
    }, [value]);

    const suggestions = useMemo(() => {
        if (!input.trim()) return [];

        return allTags.filter(
            (tag) =>
                tag.name
                    .toLowerCase()
                    .includes(input.toLowerCase()) &&
                !selected.includes(tag.name)
        );
    }, [input, allTags, selected]);

    function updateValue(next: string[]) {
        setSelected(next);
        onChange(next.join(", "));
    }

    function addTag(tag: string) {
        const name = tag.trim();

        if (!name) return;

        if (selected.includes(name)) {
            setInput("");
            return;
        }

        updateValue([...selected, name]);
        setInput("");
    }

    function removeTag(tag: string) {
        updateValue(
            selected.filter((item) => item !== tag)
        );
    }

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-gray-600">
                Tags
            </label>

            <div className="rounded-lg border border-gray-300 bg-white p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                    {selected.map((tag) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="rounded-full bg-gray-900 px-3 py-1 text-sm text-white hover:bg-black"
                        >
                            {tag} ✕
                        </button>
                    ))}
                </div>

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addTag(input);
                        }
                    }}
                    placeholder="Tekan Enter atau koma untuk menambah tag baru..."
                    className="
            w-full
            border-0
            bg-transparent
            p-0
            text-sm
            font-medium
            text-gray-900
            placeholder:text-gray-400
            outline-none
        "
                />
            </div>

            {suggestions.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                    {suggestions.map((tag) => (
                        <button
                            key={tag.id}
                            type="button"
                            onClick={() => addTag(tag.name)}
                            className="
                            block
                            w-full
                            px-4
                            py-2.5
                            text-left
                            text-sm
                            font-medium
                            text-gray-900
                            transition-colors
                            hover:bg-gray-100
                          "
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
}