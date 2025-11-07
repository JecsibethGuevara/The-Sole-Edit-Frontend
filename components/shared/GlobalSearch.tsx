import { Search } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type GlobalSearchProps = {
  query: (searchQuery: string) => void;
  text: string;
};
export const GlobalSearch = ({ query, text }: GlobalSearchProps) => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-lg border border-border p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4">
            Find Your Perfect Store
          </h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                value={text}
                onChange={(e) => query(e.target.value)}
                type="text"
                placeholder="Search stores, categories, or products..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button className="rounded-lg">Search</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
