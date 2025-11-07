"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/productDetails";
import { Edit, Trash2, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

type TableProps = {
  product: Product;
  selectedStoreId: number;
};

export const Table = ({ product, selectedStoreId }: TableProps) => {
  const { deleteOneProduct } = useProduct();

  const handleDelete = (id: number) => {
    deleteOneProduct(id, selectedStoreId);
  };

  return (
    <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="flex items-start gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{product.brand}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{product.category}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mb-4">
        <p className="text-sm text-muted-foreground mb-3">
          {30} products listed
        </p>
        <div className="flex gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.is_available
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}
          >
            {product.is_available ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-border">
        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
          <Link
            href={`/admin/products/${product.product_id}/edit`}
            className="flex  w-full justify-center items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={() => handleDelete(product.product_id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
