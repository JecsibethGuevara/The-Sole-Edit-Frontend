import React from "react";
import { Products } from "@/components/products/Products";

const Page = async ({
  params,
}: {
  params: { id: string; productId: string };
}) => {
  const resolvedParams = await params;
  return <Products params={resolvedParams} />;
};

export default Page;
