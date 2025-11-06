import React from "react";
import { Products } from "@/components/products/products";

const Page = ({ params }: { params: { id: string; productId: string } }) => {
  return <Products params={params} />;
};

export default Page;
