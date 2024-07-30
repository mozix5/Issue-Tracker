import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const IssueDetailPageLoading = () => {
  return (
    <div className="px-6 xl:px-48 md:px-16 pt-6">
      <div className=" bg-neutral space-y-4 rounded-l-2xl p-6">
        <Skeleton className="h-5 w-[30vw] bg-[#ececec]/10" />
        <div className="flex space-x-4">
          <Skeleton className="h-5 w-28 bg-[#ececec]/10" />
          <Skeleton className="h-5 w-32 bg-[#ececec]/10" />
        </div>
        <div className=" p-6 mt-16 rounded-xl min-h-20 space-y-4">
          <Skeleton className="h-5 w-[50vw] bg-[#ececec]/10" />
          <Skeleton className="h-5 w-[50vw] bg-[#ececec]/10" />
          <Skeleton className="h-5 w-[50vw] bg-[#ececec]/10" />
        </div>
      </div>
    </div>
  );
};

export default IssueDetailPageLoading;
