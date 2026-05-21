import { Skeleton } from "@/components/ui/skeleton";

const IssueFormLoading = () => {
  return (
    <div className="px-6 xl:px-48 md:px-16 pt-4">
      <div className="w-full lg:max-w-xl flex flex-col gap-4">
        {/* Title Input & AI Triage Button Row */}
        <div className="flex gap-2 w-full">
          <Skeleton className="h-10 bg-base-content/10 flex-1 rounded-lg" />
          <Skeleton className="h-10 bg-base-content/10 w-24 sm:w-28 rounded-lg" />
        </div>

        {/* Priority Selection Label & Dropdown */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 bg-base-content/10 w-16 rounded" />
          <Skeleton className="h-10 bg-base-content/10 w-full rounded-lg" />
        </div>

        {/* Description Text Editor Skeleton */}
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-9 bg-base-content/10 w-full rounded-t-lg" />
          <Skeleton className="h-72 bg-base-content/10 w-full rounded-b-lg" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 bg-primary/20 w-full rounded-lg" />
      </div>
    </div>
  );
};

export default IssueFormLoading;
