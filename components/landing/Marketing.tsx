import React from "react";
import { Search, Store, TrendingUp, Users } from "lucide-react";

export const Marketing = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Why Choose Our Marketplace?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Store,
              title: "Diverse Stores",
              description:
                "Access hundreds of verified sellers offering a wide variety of products",
            },
            {
              icon: TrendingUp,
              title: "Best Deals",
              description:
                "Enjoy exclusive discounts and promotions from our featured stores",
            },
            {
              icon: Users,
              title: "Trusted Community",
              description:
                "Shop with confidence from our community of verified buyers and sellers",
            },
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
