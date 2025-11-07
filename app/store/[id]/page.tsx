import { Store } from "@/components/stores/Store";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  return <Store params={resolvedParams} />;
};

export default Page;
