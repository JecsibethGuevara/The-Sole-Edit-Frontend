import { LogOut, ShoppingCart } from "lucide-react";
import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/home" className="text-2xl font-bold">The Sole Edit</Link>
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/home" className="text-sm hover:text-primary transition">
            Home
          </a>
          <a href="/about" className="text-sm hover:text-primary transition">
            About
          </a>

          <Link href="/cart" className="text-sm hover:text-primary transition">
            <ShoppingCart className="inline-block w-4 h-4" />
          </Link>

          <a href="/logout" className="text-sm hover:text-primary transition">
            <LogOut className="inline-block w-4 h-4 mr-1" />
          </a>
        </nav>
      </div>
    </header>
  );
};
