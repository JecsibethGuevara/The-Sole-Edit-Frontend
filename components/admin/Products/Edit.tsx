"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { ProductFormData } from "@/types/productDetails";
import { useProduct } from "@/hooks/useProduct";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id ? +params.id : 0;

  const {
    product,
    isLoading: productLoading,
    updateProduct,
  } = useProduct(productId);
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      console.log("Product data loaded:", product);
      setFormData({
        store_id: product.store_id || 0,
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        image_url: product.image_url || "",
        price: product.price || 0,
        stock: product.stock || 0,
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await updateProduct(productId, formData, formData.store_id);
      } catch (err) {
        console.error("Error updating product:", err);
        setErrors({ submit: "Failed to update product. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">Loading product data...</div>
      </div>
    );
  }

  if (!product && !productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/admin/products" className="text-primary hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Edit Product</h1>
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
                      Brand *
                    </Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => {
                        setFormData({ ...formData, brand: e.target.value });
                        if (errors.brand) setErrors({ ...errors, brand: "" });
                      }}
                      placeholder="Brand"
                      className={errors.brand ? "border-destructive" : ""}
                    />
                    {errors.brand && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.brand}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="image_url"
                      className="text-sm mb-2 block font-medium"
                    >
                      Image URL
                    </Label>
                    <Input
                      id="image_url"
                      type="text"
                      value={formData.image_url}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          image_url: e.target.value,
                        });
                        if (errors.image_url)
                          setErrors({ ...errors, image_url: "" });
                      }}
                      placeholder="Image URL"
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
                    step="0.01"
                    min="0"
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
                    min="0"
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

            {errors.submit && (
              <div className="text-destructive text-sm">{errors.submit}</div>
            )}

            <div className="border-t border-border pt-6 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
