import React from "react";
import { Button } from "../ui/button";
import { Check, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { OneProductRespose } from "@/types/productDetails";

type ProductDetailsProps = {
  product: ProductResponse | undefined;
  isLoading: boolean;
};

export const ProductDetails = ({ product, isLoading }: ProductDetailsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      console.log("Adding to cart:", product);
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="rounded-lg overflow-hidden bg-muted h-96">
            <Image
              src={"/placeholder.svg"}
              alt={product?.name || "Product Image"}
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {product?.brand}
            </p>
            <h1 className="text-4xl font-bold mb-3">{product?.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">{4.5}</span>
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-sm text-muted-foreground">
                  (120 reviews)
                </span>
              </div>
            </div>
            <p className="text-muted-foreground">{product?.description}</p>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                Category
              </p>
              <p className="text-lg font-medium">{product?.category}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                Stock Status
              </p>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  product?.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product?.is_active ? (
                  <>
                    <Check className="h-4 w-4" />
                    In Stock ({product.storeProducts?.stock})
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

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                Price
              </p>
              <p className="text-4xl font-bold text-primary">
                ${product.storeProducts?.price}
              </p>
            </div>
            <Button
              size="lg"
              className="flex-1"
              disabled={!product?.is_active}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
