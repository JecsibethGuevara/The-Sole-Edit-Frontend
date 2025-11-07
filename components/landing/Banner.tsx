import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/10 to-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
              Your Marketplace for Everything
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover hundreds of trusted stores in one place. From fashion to
              electronics, find exactly what you need with exclusive deals and
              fast shipping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={"/home/#stores"}>
                <Button size="lg" className="rounded-full">
                  Explore Stores
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-96">
            <Image
              src="/Banner.jpg"
              alt="Marketplace Banner"
              width={1000}
              height={1000}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
