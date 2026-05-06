import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { Priority, Status } from "@/lib/types";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issueDetails }: { issueDetails: Issue }) => {
  return (
    <div className="w-full bg-neutral rounded-l-2xl p-6 flex-1">
      <div className="">
        <div className=" text-3xl font-medium">{issueDetails?.title}</div>
        <div className="flex gap-4 items-center mt-3">
          <IssueStatusBadge status={issueDetails.status as Status} />
          <PriorityBadge priority={issueDetails.priority as Priority} />
          <div className="text-sm font-medium">
            {issueDetails?.createdAt!.toDateString()}
          </div>
        </div>
      </div>
      <div className=" p-6 mt-8 rounded-xl bg-[var(--fallback-bc,oklch(var(--bc)/0.2))] min-h-20">
        {issueDetails?.description}
      </div>
    </div>
  );
};

export default IssueDetails;
