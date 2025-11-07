"use client";
import { Button } from "@/components/ui/button";
import { StoresGrid } from "./StoresGrid";
import { Header } from "../shared/Header";
import { Banner } from "./Banner";
import { Stats } from "./Stats";
import { GlobalSearch } from "../shared/GlobalSearch";
import { Marketing } from "./Marketing";
import { Footer } from "../shared/Footer";
import { useStores } from "@/hooks/useStores";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { stores, searchStores, pagination, isLoading, error, refetch } =
    useStores();

  useEffect(() => {
    if (searchQuery) {
      const timeoutId = setTimeout(() => {
        searchStores(searchQuery);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, searchStores]);

  return (
    <main className="w-full bg-background text-foreground">
      <Header />
      <Banner />
      <Stats />

      <GlobalSearch query={setSearchQuery} text={searchQuery} />
      <StoresGrid stores={stores} pagination={pagination} />
      <Marketing />

      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of happy customers and discover amazing deals today
          </p>
          <Link href={"/home/#stores"}>
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full"
            >
              Browse All Stores
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
