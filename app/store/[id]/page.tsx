import { StoreDetails } from "@/components/stores/StoreDetails";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  return <StoreDetails params={resolvedParams} />;
};

export default Page;
