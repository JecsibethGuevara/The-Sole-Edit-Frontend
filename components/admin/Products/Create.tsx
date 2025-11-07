"use client";

import type React from "react";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ProductFormData } from "@/types/productDetails";
import { useProduct } from "@/hooks/useProduct";
import { useStores } from "@/hooks/useStores";

export default function CreateProductPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    store_id: 0,
    name: "",
    description: "",
    category: "",
    brand: "",
    image_url: "",
    price: 0,
    stock: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { createProduct } = useProduct();
  const { stores } = useStores();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        try {
          createProduct(formData);
        } catch (err) {
          console.error("Error creating product:", err);
        }
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            <h1 className="text-2xl font-bold">Create New Product</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm mb-2 block font-medium"
                  >
                    Product Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="Classic T-Shirt"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label
                      htmlFor="category"
                      className="text-sm mb-2 block font-medium"
                    >
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => {
                        setFormData({ ...formData, category: e.target.value });
                        if (errors.category)
                          setErrors({ ...errors, category: "" });
                      }}
                      placeholder="Category"
                      className={errors.category ? "border-destructive" : ""}
                    />
                    {errors.category && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="brand"
                      className="text-sm mb-2 block font-medium"
                    >
                      Brand
                    </Label>
                    <select
                      id="brand"
                      value={formData.brand}
                      onChange={(e) =>
                        setFormData({ ...formData, brand: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {stores.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label
                      htmlFor="image_url"
                      className="text-sm mb-2 block font-medium"
                    >
                      Image
                    </Label>
                    <Input
                      id="image_url"
                      type="file"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          image_url: e.target.value,
                        });
                        if (errors.image_url)
                          setErrors({ ...errors, image_url: "" });
                      }}
                      placeholder="TSHIRT-001"
                      className={errors.image_url ? "border-destructive" : ""}
                    />
                    {errors.image_url && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.image_url}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold mb-4">
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label
                    htmlFor="price"
                    className="text-sm mb-2 block font-medium"
                  >
                    Price ($) *
                  </Label>
                  <Input
                    id="price"
                    value={formData.price}
                    type="number"
                    onChange={(e) => {
                      setFormData({ ...formData, price: +e.target.value });
                      if (errors.price) setErrors({ ...errors, price: "" });
                    }}
                    placeholder="29.99"
                    className={errors.price ? "border-destructive" : ""}
                  />
                  {errors.price && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.price}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="stock"
                    className="text-sm mb-2 block font-medium"
                  >
                    Stock Quantity *
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        stock: Number.parseInt(e.target.value) || 0,
                      });
                      if (errors.stock) setErrors({ ...errors, stock: "" });
                    }}
                    placeholder="150"
                    className={errors.stock ? "border-destructive" : ""}
                  />
                  {errors.stock && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.stock}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold mb-4">Description</h2>
              <div>
                <Label
                  htmlFor="description"
                  className="text-sm mb-2 block font-medium"
                >
                  Product Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter a detailed product description..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={5}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-border pt-6 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
