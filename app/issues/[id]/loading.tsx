import { Skeleton } from "@/components/ui/skeleton";

const IssueDetailPageLoading = () => {
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-10 flex flex-col lg:flex-row gap-8 min-h-[90vh] items-start">

      {/* Main column */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">

        {/* IssueDetails card */}
        <div className="w-full bg-base-200 shadow-xl rounded-3xl overflow-hidden">
          {/* Gradient header zone */}
          <div className="px-8 pt-8 pb-7 flex flex-col gap-5 bg-base-200">
            <Skeleton className="h-4 w-20 rounded-full bg-base-content/10" />
            <Skeleton className="h-10 w-3/4 bg-base-content/10" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20 rounded-full bg-base-content/10" />
              <Skeleton className="h-6 w-16 rounded-full bg-base-content/10" />
              <Skeleton className="h-4 w-28 rounded-full bg-base-content/10 ml-auto" />
            </div>
          </div>
          {/* Description zone */}
          <div className="px-8 pb-8 pt-6 flex flex-col gap-3">
            <Skeleton className="h-3 w-20 bg-base-content/10" />
            <div className="rounded-2xl bg-base-100/50 px-6 py-5 min-h-24 flex flex-col gap-3">
              <Skeleton className="h-4 w-full bg-base-content/10" />
              <Skeleton className="h-4 w-5/6 bg-base-content/10" />
              <Skeleton className="h-4 w-4/6 bg-base-content/10" />
            </div>
          </div>
        </div>

        {/* Activity log card */}
        <div className="w-full bg-base-200 shadow-xl rounded-3xl p-6 flex flex-col gap-4">
          <Skeleton className="h-3 w-32 bg-base-content/10" />
          <div className="flex flex-col gap-5 pl-6 ml-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-2/3 bg-base-content/10" />
                <Skeleton className="h-2.5 w-20 bg-base-content/10" />
              </div>
            ))}
          </div>
        </div>

        {/* Comments card */}
        <div className="w-full bg-base-200 shadow-xl rounded-3xl p-6 flex flex-col gap-5">
          <Skeleton className="h-3 w-24 bg-base-content/10" />
          <Skeleton className="h-20 w-full rounded-2xl bg-base-content/10" />
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 py-3">
              <Skeleton className="w-8 h-8 rounded-full shrink-0 bg-base-content/10" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-3 w-32 bg-base-content/10" />
                <Skeleton className="h-3 w-full bg-base-content/10" />
                <Skeleton className="h-3 w-4/5 bg-base-content/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:w-72 shrink-0 flex flex-col gap-4">
        <div className="flex items-center gap-2.5 px-1">
          <Skeleton className="w-8 h-8 rounded-xl bg-base-content/10" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-24 bg-base-content/10" />
            <Skeleton className="h-2 w-16 bg-base-content/10" />
          </div>
        </div>
        <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-3">
          <Skeleton className="h-2.5 w-16 bg-base-content/10" />
          <Skeleton className="h-9 w-full rounded-xl bg-base-content/10" />
        </div>
        <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-3">
          <Skeleton className="h-2.5 w-14 bg-base-content/10" />
          <Skeleton className="h-9 w-full rounded-xl bg-base-content/10" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-2.5 w-16 bg-base-content/10 ml-1" />
          <Skeleton className="h-10 w-full rounded-2xl bg-base-content/10" />
          <Skeleton className="h-10 w-full rounded-2xl bg-base-content/10" />
        </div>
        <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-3">
          <Skeleton className="h-2.5 w-20 bg-base-content/10" />
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-2.5 w-12 bg-base-content/10" />
                <Skeleton className="h-2.5 w-20 bg-base-content/10" />
              </div>
            ))}
          </div>
          <Skeleton className="h-9 w-full rounded-xl bg-base-content/10" />
        </div>
      </div>

    </div>
  );
};

export default IssueDetailPageLoading;
