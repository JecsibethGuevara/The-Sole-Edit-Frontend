import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "../ui/card";
import { Product } from "@/types/productDetails";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Paginations } from "@/types/store.interfaces";

type ProductsGridProps = {
  products: Product[];
  storeId: number | undefined;
  pagination?: Paginations;
};
const ProductsGrid = ({ products, storeId, pagination }: ProductsGridProps) => {
  return (
    <>
      {products.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                href={`/store/${storeId}/products/${product.product_id}`}
                key={product.product_id}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      width={400}
                      height={400}
                      src={"/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">
                      {product?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {product?.category}
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
              </Link>
            ))}
          </div>
          {pagination && pagination?.page && (
            <Pagination className="p-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={pagination?.hasPrev ? pagination?.prevPageUrl : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {pagination?.page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href={pagination?.nextPageUrl} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No products found matching your search.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
