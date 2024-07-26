import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
  return (
    <div className="mt-14 space-y-3">
      <Skeleton className="h-4 w-[150px] mb-9" />
      <div className="flex space-x-3 ">
        <Skeleton className="h-[125px] w-[300px] rounded-xl" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-[40px] w-[80px]" />
          <Skeleton className="h-[40px] w-[80px]" />
        </div>
      </div>
      <div className="flex space-x-3">
        <Skeleton className="h-[125px] w-[300px] rounded-xl" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-[40px] w-[80px]" />
          <Skeleton className="h-[40px] w-[80px]" />
        </div>
      </div>
      <div className="flex space-x-3">
        <Skeleton className="h-[125px] w-[300px] rounded-xl" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-[40px] w-[80px]" />
          <Skeleton className="h-[40px] w-[80px]" />
        </div>
      </div>
    </div>
  );
}
