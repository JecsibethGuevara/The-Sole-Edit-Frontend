import React from "react";
import { ProductSearch } from "./ProductSearch";
import { CategoryFilter } from "./CategoryFilter";
import ProductsGrid from "./ProductsGrid";
import { Product } from "@/types/productDetails";
import { Paginations } from "@/types/store.interfaces";

type SuggestionsSectionsProps = {
  setSearchQuery: (query: string) => void;
  searchQuery: string;
  setSelectedCategory: (category: { label: string; value: string }) => void;
  selectedCategory: { label: string; value: string };
  products: Product[];
  storeId?: number | undefined;
  productsPagination: Paginations | undefined;
};

export const SuggestionsSections = ({
  setSearchQuery,
  searchQuery,
  setSelectedCategory,
  selectedCategory,
  productsPagination,
  products,
  storeId,
}: SuggestionsSectionsProps) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        <ProductSearch query={setSearchQuery} text={searchQuery} />

        <CategoryFilter
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
      <ProductsGrid
        products={products}
        storeId={storeId}
        pagination={productsPagination}
      />
    </section>
  );
};
