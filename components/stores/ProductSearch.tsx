import { Search } from "lucide-react";
import React from "react";

type GlobalSearchProps = {
  query: (searchQuery: string) => void;
  text: string;
};
export const ProductSearch = ({ query, text }: GlobalSearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search products..."
          value={text}
          onChange={(e) => query(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};
