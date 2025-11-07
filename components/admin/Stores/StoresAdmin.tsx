"use client";

import { useEffect, useState } from "react";
import { Header } from "../../shared/Header";
import { StoreAdminFilters } from "./StoreAdminFilters";
import { StoreCard } from "./StoreCard";
import { useStores } from "@/hooks/useStores";
import { Category } from "@/components/stores/CategoryFilter";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function StoresAdmin() {
  const [filterStatus, setFilterStatus] = useState<Category>({
    label: "all",
    value: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { stores, searchStores, pagination, deleteStore } = useStores();

  useEffect(() => {
    if (searchQuery || filterStatus?.label !== "all") {
      const timeoutId = setTimeout(() => {
        searchStores(searchQuery, filterStatus);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filterStatus, searchStores]);

  const handleDelete = (id: number) => {
    deleteStore(id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StoreAdminFilters
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          users={false}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              handleDelete={handleDelete}
            />
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
