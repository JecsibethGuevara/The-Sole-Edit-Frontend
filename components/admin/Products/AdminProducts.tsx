"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/shared/Header";
import { StoreAdminFilters } from "../Stores/StoreAdminFilters";
import { useProducts } from "@/hooks/useProducts";
import { Table } from "./Table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState({
    label: "all",
    value: "",
  });
  const [store, setStore] = useState(2);
  const { products, pagination, searchProducts } = useProducts(store);

  useEffect(() => {}, [products]);

  useEffect(() => {
    if (store && (searchQuery || filterStatus?.label !== "all")) {
      const timeoutId = setTimeout(() => {
        searchProducts(searchQuery, filterStatus);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filterStatus, store, searchProducts]);

  return (
    <div className="min-h-screen max-w-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreAdminFilters
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          store={store}
          setStore={setStore}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Table key={product.id} product={product} selectedStoreId={store} />
          ))}
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
      </main>
    </div>
  );
}
