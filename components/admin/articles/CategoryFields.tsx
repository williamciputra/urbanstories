"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Subcategory = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
};

type CategoryFieldsProps = {
  categoryId: string;
  subcategoryId: string;
  onCategoryChange: (value: string) => void;
  onSubcategoryChange: (value: string) => void;
};

export default function CategoryFields({
  categoryId,
  subcategoryId,
  onCategoryChange,
  onSubcategoryChange,
}: CategoryFieldsProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoryRes, subcategoryRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/subcategories"),
        ]);

        setCategories(await categoryRes.json());
        setSubcategories(await subcategoryRes.json());
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (loading || categoryId || categories.length === 0) return;

    const first = categories[0];

    onCategoryChange(first.id);

    const firstSub = subcategories.find(
      (item) => item.category_id === first.id
    );

    if (firstSub) {
      onSubcategoryChange(firstSub.id);
    }
  }, [
    loading,
    categoryId,
    categories,
    subcategories,
    onCategoryChange,
    onSubcategoryChange,
  ]);

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (item) => item.category_id === categoryId
    );
  }, [subcategories, categoryId]);

  useEffect(() => {
    if (loading || !categoryId) return;

    if (
      subcategoryId &&
      filteredSubcategories.some(
        (item) => item.id === subcategoryId
      )
    ) {
      return;
    }

    onSubcategoryChange(
      filteredSubcategories[0]?.id ?? ""
    );
  }, [
    loading,
    categoryId,
    subcategoryId,
    filteredSubcategories,
    onSubcategoryChange,
  ]);

  if (loading) return null;

  return (
    <>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Category
        </label>

        <select
          value={categoryId}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="h-10 w-[140px] rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-black appearance-none focus:border-black focus:outline-none"
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Subcategory
        </label>

        <select
          value={subcategoryId}
          disabled={!filteredSubcategories.length}
          onChange={(e) =>
            onSubcategoryChange(e.target.value)
          }
          className="h-10 w-[180px] rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-black appearance-none focus:border-black focus:outline-none disabled:bg-gray-100"
        >
          {filteredSubcategories.length === 0 ? (
            <option>No subcategory</option>
          ) : (
            filteredSubcategories.map((subcategory) => (
              <option
                key={subcategory.id}
                value={subcategory.id}
              >
                {subcategory.name}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
}