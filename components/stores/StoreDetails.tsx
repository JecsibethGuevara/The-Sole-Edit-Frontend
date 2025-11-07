import React from "react";
import { Button } from "../ui/button";
import { Store } from "@/types/store.interfaces";
import Image from "next/image";

type StoreDetailsProps = {
  store: Store | null;
};

export const StoreDetails = ({ store }: StoreDetailsProps) => {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden bg-muted h-64">
              <Image
                src={store?.image || "/placeholder.svg"}
                alt={store?.name || "Store Image"}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{store?.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold">{4}</span>
                    <span className="text-yellow-400 text-xl">★</span>
                  </div>
                  <span className="text-muted-foreground">{3500} products</span>
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      store?.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {store?.is_active ? (
                      <>
                        {/* <Check className="h-4 w-4" /> */}
                        Active
                      </>
                    ) : (
                      <>
                        {/* <X className="h-4 w-4" /> */}
                        Inactive
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">{store?.description}</p>

            {/* Store Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* <MapPin className="h-5 w-5 text-primary" /> */}
                <span className="text-sm">{store?.address}</span>
              </div>
              <div className="flex items-center gap-3">
                {/* <Phone className="h-5 w-5 text-primary" /> */}
                <a
                  href={`tel:${store?.phone}`}
                  className="text-sm hover:underline"
                >
                  {store?.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                {/* <Mail className="h-5 w-5 text-primary" /> */}
                <a
                  href={`mailto:${store?.email}`}
                  className="text-sm hover:underline"
                >
                  {store?.email}
                </a>
              </div>
            </div>

            <a
              href={`mailto:${store?.email}`}
              className="text-sm hover:underline"
            >
              <Button className="mt-6">Contact Store</Button>{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
