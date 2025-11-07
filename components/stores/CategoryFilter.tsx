import React from "react";

export type Category = {
  label: string;
  value: string;
};

type CategoryFilterProps = {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};
export const CategoryFilter = ({
  setSelectedCategory,
  selectedCategory,
}: CategoryFilterProps) => {
  const categories = [
    { label: "All", value: "" },
    { label: "In Stock", value: "true" },
    { label: "Out of Stock", value: "false" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory.label === category.label
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          {category.label?.charAt(0).toUpperCase() + category.label?.slice(1)}
        </button>
      ))}
    </div>
  );
};
