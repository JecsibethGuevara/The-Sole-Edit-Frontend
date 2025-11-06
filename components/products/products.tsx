"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, ShoppingCart, Check, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ProductDetails } from "@/types/productDetails";

export const Products = ({
  params,
}: {
  params: { id: string; productId: string };
}) => {
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const product: ProductDetails = {
    id: Number.parseInt(params.productId),
    name: "Premium Classic T-Shirt",
    description:
      "Experience ultimate comfort with our premium classic t-shirt. Made from 100% organic cotton, this versatile piece is perfect for everyday wear. Features a timeless design that works with any outfit, from casual to semi-formal.",
    category: "Tops",
    brand: "StyleCo",
    price: 49.99,
    image: "/classic-tshirt.jpg",
    stock: 45,
    rating: 4.8,
    reviews: 328,
    inStock: true,
    colors: ["Black", "White", "Navy", "Gray", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  };

  const relatedProducts: ProductDetails[] = [
    {
      id: 1,
      name: "Classic T-Shirt",
      description: "Comfortable everyday t-shirt",
      category: "Tops",
      brand: "StyleCo",
      price: 29.99,
      image: "/classic-tshirt.jpg",
      stock: 50,
      rating: 4.5,
      reviews: 200,
      inStock: true,
      colors: ["Black", "White"],
      sizes: ["M", "L"],
    },
    {
      id: 2,
      name: "Denim Jeans",
      description: "Classic denim jeans",
      category: "Bottoms",
      brand: "DenimPro",
      price: 79.99,
      image: "/denim-jeans.jpg",
      stock: 30,
      rating: 4.8,
      reviews: 350,
      inStock: true,
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 3,
      name: "Wool Sweater",
      description: "Warm wool sweater",
      category: "Tops",
      brand: "StyleCo",
      price: 69.99,
      image: "/wool-sweater.jpg",
      stock: 20,
      rating: 4.7,
      reviews: 180,
      inStock: true,
      colors: ["Gray", "Navy"],
      sizes: ["M", "L"],
    },
    {
      id: 4,
      name: "Casual Sneakers",
      description: "Comfortable casual sneakers",
      category: "Shoes",
      brand: "StepWear",
      price: 89.99,
      image: "/casual-sneakers.jpg",
      stock: 35,
      rating: 4.6,
      reviews: 240,
      inStock: true,
      colors: ["White", "Black"],
      sizes: ["S", "M", "L"],
    },
  ];

  const categories = [
    "all",
    ...new Set(relatedProducts.map((p) => p.category)),
  ];
  const brands = ["all", ...new Set(relatedProducts.map((p) => p.brand))];

  const filteredProducts = relatedProducts.filter((prod) => {
    const matchesSearch = prod.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || prod.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "all" || prod.brand === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <main className="w-full bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href={`/store/${params.id}`}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden bg-muted h-96">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">
                Color: {selectedColor}
              </p>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-primary"
                        : "border-border"
                    }`}
                    style={{
                      backgroundColor:
                        color.toLowerCase() === "black"
                          ? "#000"
                          : color.toLowerCase() === "white"
                          ? "#fff"
                          : color.toLowerCase() === "navy"
                          ? "#001f3f"
                          : color.toLowerCase() === "gray"
                          ? "#808080"
                          : color.toLowerCase() === "burgundy"
                          ? "#800020"
                          : "#ccc",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {product.brand}
              </p>
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold">
                    {product.rating}
                  </span>
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                  Category
                </p>
                <p className="text-lg font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                  Stock Status
                </p>
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? (
                    <>
                      <Check className="h-4 w-4" />
                      In Stock ({product.stock})
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4" />
                      Out of Stock
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Size: {selectedSize}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                  Price
                </p>
                <p className="text-4xl font-bold text-primary">
                  ${product.price}
                </p>
              </div>
              <Button size="lg" className="flex-1" disabled={!product.inStock}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <h2 className="text-3xl font-bold mb-8">
          More Products From This Store
        </h2>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <p className="text-sm font-semibold mb-3">Category</p>
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

          <div>
            <p className="text-sm font-semibold mb-3">Brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedBrand === brand
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <Card
                key={prod.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={prod.image || "/placeholder.svg"}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">
                    {prod.brand}
                  </p>
                  <h3 className="font-semibold mb-1 truncate">{prod.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {prod.category}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-primary">
                      ${prod.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold">
                        {prod.rating}
                      </span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs mb-3">
                    {prod.inStock ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="h-3 w-3" />
                        In Stock
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600">
                        <X className="h-3 w-3" />
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    View Product
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No products found matching your filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
