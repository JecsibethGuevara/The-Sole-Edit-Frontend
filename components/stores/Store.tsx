"use client";

import React, { useEffect, useState } from "react";

import { useStore } from "@/hooks/useStore";
import { useProducts } from "@/hooks/useProducts";
import { Header } from "../shared/Header";
import { StoreDetails } from "./StoreDetails";
import { Category } from "./CategoryFilter";
import { SuggestionsSections } from "./SuggestionsSections";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Footer } from "../shared/Footer";

export const Store = ({ params }: { params: { id: string } }) => {
  const id = params.id ? parseInt(params.id, 10) : undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    label: "all",
    value: "",
  });
  const { store, isLoading, error } = useStore(id);
  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    pagination,
    searchProducts,
  } = useProducts(id);

  useEffect(() => {}, [id, store, isLoading, error]);

  useEffect(() => {
    if (id && (searchQuery || selectedCategory?.label !== "all")) {
      const timeoutId = setTimeout(() => {
        searchProducts(searchQuery, selectedCategory);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, selectedCategory, id, searchProducts]);

  return (
    <main className="w-full bg-background text-foreground">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href={`/home#stores`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <StoreDetails store={store} />
      <SuggestionsSections
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        products={products}
        productsPagination={pagination}
        storeId={id}
      />
      <Footer />
    </main>
  );
};
