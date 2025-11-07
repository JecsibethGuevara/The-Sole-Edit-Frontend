import { Category } from "@/components/stores/CategoryFilter";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStores } from "@/hooks/useStores";
import { Search } from "lucide-react";
import React from "react";

type StoreAdminFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus?: Category;
  setFilterStatus?: (status: Category) => void;
  store?: number;
  setStore?: (storeId: number) => void;
  users?: boolean;
};
export const StoreAdminFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  store,
  setStore,
}: StoreAdminFiltersProps) => {
  const { stores } = useStores();

  const categories = [
    { label: "all", value: "" },
    { label: "active", value: "true" },
    { label: "inactive", value: "false" },
  ];

  return (
    <Card className="p-6 mb-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {store && (
            <div>
              <Label className="text-sm mb-2 block">Store</Label>
              <select
                value={store}
                onChange={(e) => setStore(+e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!stores}
              >
                <option value={0}>All Stores</option>
                {stores?.map((storeItem) => (
                  <option key={storeItem.id} value={storeItem.id}>
                    {storeItem.name}
                  </option>
                ))}
              </select>
              {!stores && (
                <p className="text-sm text-muted-foreground mt-1">
                  Loading stores...
                </p>
              )}
            </div>
          )}
          {setFilterStatus && (
            <div>
              <Label className="text-sm mb-2 block">Status</Label>
              <select
                value={filterStatus?.value}
                onChange={(e) =>
                  setFilterStatus(
                    categories.find((cat) => cat.value === e.target.value)!
                  )
                }
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!categories}
              >
                {categories?.map((cat, index) => (
                  <option key={index} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {!stores && (
                <p className="text-sm text-muted-foreground mt-1">
                  Loading stores...
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
