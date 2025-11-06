"use client";

import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useStores } from "@/hooks/useStores";
import Link from "next/link";

export const StoresGrid = () => {
  const { stores, isLoading, error, refetch } = useStores();

  return (
    <section id="stores" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Stores
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse our curated selection of top-rated stores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={store.image || "/placeholder.svg"}
                  alt={store.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {store.description}
                </p>
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{4}</span>
                    <span className="text-yellow-400">★</span>
                  </div>
                  <span className="text-muted-foreground">{10} products</span>
                </div>
                <Link href={`store/${store.id}`}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    Visit Store
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
