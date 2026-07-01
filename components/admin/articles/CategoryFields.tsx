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

export default function CategoryFields() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  useEffect(() => {
    async function loadData() {
      const [categoryRes, subcategoryRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/subcategories"),
      ]);

      const categoriesData = await categoryRes.json();
      const subcategoriesData = await subcategoryRes.json();

      setCategories(categoriesData);
      setSubcategories(subcategoriesData);

      if (categoriesData.length > 0) {
        const firstCategory = categoriesData[0];

        setCategoryId(firstCategory.id);

        const firstSubcategory = subcategoriesData.find(
          (item: Subcategory) =>
            item.category_id === firstCategory.id
        );

        if (firstSubcategory) {
          setSubcategoryId(firstSubcategory.id);
        }
      }
    }

    loadData();
  }, []);

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(
      (item) => item.category_id === categoryId
    );
  }, [subcategories, categoryId]);

  useEffect(() => {
    if (filteredSubcategories.length === 0) {
      setSubcategoryId("");
      return;
    }

    setSubcategoryId(filteredSubcategories[0].id);
  }, [categoryId]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Subcategory
        </label>

        <select
          value={subcategoryId}
          disabled={filteredSubcategories.length === 0}
          onChange={(e) =>
            setSubcategoryId(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 disabled:bg-gray-100"
        >
          {filteredSubcategories.length === 0 ? (
            <option value="">
              No subcategory
            </option>
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
    </div>
  );
}