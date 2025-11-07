import React from "react";

export const Stats = () => {
  // remember to fix this
  const stats = [
    { stat: "100", label: "Stores" },
    { stat: "10k", label: "Users" },
    { stat: "1M", label: "Revenue" },
    { stat: "5", label: "Rating" },
  ];

  return (
    <section className="bg-primary text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((i, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {i.stat}
              </div>
              <div className="text-sm opacity-90">{i.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
