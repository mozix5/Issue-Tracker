import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { Priority, Status } from "@/lib/types";
import { Issue } from "@prisma/client";

const IssueDetails = ({ issueDetails }: { issueDetails: Issue }) => {
  return (
    <div className="w-full bg-base-200 border border-base-content/10 shadow-xl rounded-3xl p-6 flex-1">
      <div className="">
        <div className="text-3xl font-medium text-base-content">{issueDetails?.title}</div>
        <div className="flex gap-4 items-center mt-3">
          <IssueStatusBadge status={issueDetails.status as Status} />
          <PriorityBadge priority={issueDetails.priority as Priority} />
          <div className="text-sm font-medium text-base-content/60">
            {issueDetails?.createdAt!.toDateString()}
          </div>
        </div>
      </div>
      <div className="p-6 mt-8 rounded-2xl bg-base-100 border border-base-content/5 min-h-20 text-base-content/90 leading-relaxed">
        {issueDetails?.description}
      </div>
    </div>
  );
};

export default IssueDetails;
