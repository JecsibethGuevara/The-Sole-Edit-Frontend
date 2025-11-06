"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useStore } from "@/hooks/useStore";
import { useProducts } from "@/hooks/useProducts";

export const StoreDetails = ({ params }: { params: { id: string } }) => {
  const id = params.id ? parseInt(params.id, 10) : undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { store, isLoading, error } = useStore(id);
  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    pagination,
    searchProducts,
    loadNextPage,
    loadPrevPage,
    fetchProducts,
  } = useProducts(id);

  useEffect(() => {}, [id, store, isLoading, error]);

  // Mock product data

  // Get unique categories
  const categories = [
    "all",
    ...new Set(products.map((p) => p.product.category)),
  ];

  useEffect(() => {
    if (id && (searchQuery || selectedCategory !== "all")) {
      const timeoutId = setTimeout(() => {
        searchProducts(searchQuery, selectedCategory);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, selectedCategory, id, searchProducts]);

  return (
    <main className="w-full bg-background text-foreground">
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden bg-muted h-64">
                <img
                  src={store?.image || "/placeholder.svg"}
                  alt={store?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{store?.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold">{4}</span>
                      <span className="text-yellow-400 text-xl">★</span>
                    </div>
                    <span className="text-muted-foreground">
                      {3500} products
                    </span>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        store?.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {store?.is_active ? (
                        <>
                          {/* <Check className="h-4 w-4" /> */}
                          Active
                        </>
                      ) : (
                        <>
                          {/* <X className="h-4 w-4" /> */}
                          Inactive
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{store?.description}</p>

              {/* Store Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* <MapPin className="h-5 w-5 text-primary" /> */}
                  <span className="text-sm">{store?.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* <Phone className="h-5 w-5 text-primary" /> */}
                  <a
                    href={`tel:${store?.phone}`}
                    className="text-sm hover:underline"
                  >
                    {store?.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  {/* <Mail className="h-5 w-5 text-primary" /> */}
                  <a
                    href={`mailto:${store?.email}`}
                    className="text-sm hover:underline"
                  >
                    {store?.email}
                  </a>
                </div>
              </div>

              <a
                href={`mailto:${store?.email}`}
                className="text-sm hover:underline"
              >
                <Button className="mt-6">Contact Store</Button>{" "}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Products</h2>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={product.product.image_url || "/placeholder.svg"}
                    alt={product.product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 truncate">
                    {product.product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.product.category}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-semibold">{4}</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found matching your search.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
