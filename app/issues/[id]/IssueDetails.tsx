import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import PriorityBadge from "@/app/components/PriorityBadge";
import { Priority, Status } from "@/lib/types";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import { CalendarDays, Hash, FileText } from "lucide-react";

const priorityAccent: Record<string, string> = {
  LOW:    "from-gray-500/10 via-base-200 to-base-200",
  MEDIUM: "from-blue-500/10 via-base-200 to-base-200",
  HIGH:   "from-orange-500/10 via-base-200 to-base-200",
  URGENT: "from-red-600/15 via-base-200 to-base-200",
};

const IssueDetails = ({ issueDetails }: { issueDetails: Issue }) => {
  const accent = priorityAccent[issueDetails.priority] ?? priorityAccent.MEDIUM;

  return (
    <div className="w-full bg-base-200 shadow-xl rounded-3xl overflow-hidden flex-1">

      <div className={`bg-gradient-to-br ${accent} px-8 pt-8 pb-7 flex flex-col gap-5`}>

        <div className="flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-base-100/50 text-[10px] font-black uppercase tracking-widest text-base-content/50">
          <Hash size={9} />
          <span>Issue {issueDetails.id}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-base-content leading-tight tracking-tight">
          {issueDetails.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2.5">
          <IssueStatusBadge status={issueDetails.status as Status} />
          <PriorityBadge priority={issueDetails.priority as Priority} />
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-base-content/40 uppercase tracking-wider ml-auto">
            <CalendarDays size={12} />
            <span>
              {issueDetails.createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="px-8 pb-8 pt-6 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-base-content/40">
          <FileText size={10} />
          <span>Description</span>
        </div>
        <div className="rounded-2xl bg-base-100/50 px-6 py-5 min-h-24 leading-relaxed prose max-w-none">
          <ReactMarkdown>{issueDetails.description}</ReactMarkdown>
        </div>
      </div>

    </div>
  );
};

export default IssueDetails;
