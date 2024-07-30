import { Skeleton } from "@/components/ui/skeleton";

const IssueFormLoading = () => {
  return (
    <div className="pt-4">
      <div className="lg:max-w-xl w-full space-y-4 ">
        <Skeleton className="h-7 bg-[#ececec]/10" />
        <Skeleton className="h-80 bg-[#ececec]/10" />
      </div>
    </div>
  );
};

export default IssueFormLoading;
