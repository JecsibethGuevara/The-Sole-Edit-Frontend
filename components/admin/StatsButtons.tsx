import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";

type Stat = {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
  color: string;
};

type StatsButtonsProps = {
  stats: Stat[];
};
const StatsButtons = ({ stats }: StatsButtonsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Link key={i} href={stat.href}>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </h3>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default StatsButtons;
