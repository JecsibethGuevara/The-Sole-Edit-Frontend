"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import Image from "next/image";
import { Header } from "../shared/Header";
import { SuggestionsSections } from "../stores/SuggestionsSections";
import { Category } from "../stores/CategoryFilter";
import { ProductDetails } from "./ProductDetails";
import { Footer } from "../shared/Footer";

export const Products = ({
  params,
}: {
  params: { id: string; productId: string };
}) => {
  const id = params.productId ? parseInt(params.productId, 10) : undefined;
  const store_id = params.id ? parseInt(params.id, 10) : undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    label: "all",
    value: "",
  });

  const {
    product,
    isLoading: productLoading,
    error: productError,
  } = useProduct(id);

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    pagination,
    searchProducts,
  } = useProducts(store_id);

  useEffect(() => {}, [id, product]);

  useEffect(() => {
    if (id && (searchQuery || selectedCategory.label !== "all")) {
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
          href={`/store/${params.id}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </div>
      <ProductDetails product={product} isLoading={productLoading} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">
          More Products From This Store
        </h2>

        <SuggestionsSections
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          products={products}
          storeId={store_id}
          productsPagination={pagination}
        />
      </section>
      <Footer />
    </main>
  );
};
