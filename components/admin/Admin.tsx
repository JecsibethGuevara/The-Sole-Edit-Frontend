"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Package, Store } from "lucide-react";
import { Header } from "../shared/Header";
import { useRouter } from "next/navigation";
import StatsButtons from "./StatsButtons";

export const Admin = () => {
  const router = useRouter();

  const stats = [
    {
      label: "Total Stores",
      value: "24",
      icon: Store,
      href: "/admin/stores",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      label: "Total Products",
      value: "1,284",
      icon: Package,
      href: "/admin/products",
      color: "bg-green-500/10 text-green-600",
    },
    {
      label: "Total Users",
      value: "3,542",
      icon: Users,
      href: "/admin",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      label: "Revenue",
      value: "$45,231",
      icon: BarChart3,
      href: "/admin",
      color: "bg-amber-500/10 text-amber-600",
    },
  ];

  return (
    <div className="">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Admin</h2>
          <p className="text-muted-foreground">
            Heres whats happening with your marketplace today
          </p>
        </div>

        <StatsButtons stats={stats} />
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/admin/products/create")}
              className="w-full"
            >
              Add New Product
            </Button>
            <Button
              onClick={() => router.push("/admin/stores/create")}
              className="w-full bg-transparent"
              variant="outline"
            >
              Add New Store
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};
