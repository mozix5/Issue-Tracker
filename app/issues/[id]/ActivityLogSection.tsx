import prisma from "@/prisma/client";
import { formatDistanceToNow } from "date-fns";
import { Activity, User, ClipboardList, RefreshCw, UserPlus, FileText, AlertCircle } from "lucide-react";

type Props = {
  issueId: number;
};

const getIcon = (action: string) => {
  switch (action) {
    case "CREATED":
      return <ClipboardList size={14} className="text-success" />;
    case "STATUS_CHANGE":
      return <RefreshCw size={14} className="text-info" />;
    case "PRIORITY_CHANGE":
      return <AlertCircle size={14} className="text-warning" />;
    case "ASSIGNEE_CHANGE":
      return <UserPlus size={14} className="text-primary" />;
    case "TITLE_CHANGE":
    case "DESCRIPTION_CHANGE":
      return <FileText size={14} className="text-base-content/60" />;
    default:
      return <Activity size={14} className="text-base-content/60" />;
  }
};

const getMessage = (log: {
  action: string;
  oldValue: string | null;
  newValue: string | null;
  userName: string | null;
}) => {
  const actor = <strong>{log.userName || "Someone"}</strong>;

  switch (log.action) {
    case "CREATED":
      return (
        <span>
          {actor} created this issue: <span className="italic">&ldquo;{log.newValue}&rdquo;</span>
        </span>
      );
    case "STATUS_CHANGE":
      return (
        <span>
          {actor} changed status from <span className="badge badge-sm badge-neutral">{log.oldValue}</span> to <span className="badge badge-sm badge-neutral font-bold">{log.newValue}</span>
        </span>
      );
    case "PRIORITY_CHANGE":
      return (
        <span>
          {actor} updated priority from <span className="font-semibold">{log.oldValue}</span> to <span className="font-semibold text-primary">{log.newValue}</span>
        </span>
      );
    case "ASSIGNEE_CHANGE":
      return (
        <span>
          {actor} changed assignee to <span className="font-semibold">{log.newValue}</span>
        </span>
      );
    case "TITLE_CHANGE":
      return (
        <span>
          {actor} renamed issue from <span className="line-through text-base-content/50">&ldquo;{log.oldValue}&rdquo;</span> to <span className="font-semibold">&ldquo;{log.newValue}&rdquo;</span>
        </span>
      );
    case "DESCRIPTION_CHANGE":
      return <span>{actor} updated the issue description</span>;
    default:
      return <span>{actor} performed an action</span>;
  }
};

const ActivityLogSection = async ({ issueId }: Props) => {
  const logs = await prisma.activityLog.findMany({
    where: { issueId },
    orderBy: { createdAt: "desc" },
  });

  if (logs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 bg-base-100 border border-base-content/10 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-base-content/5 pb-3">
        <Activity size={16} className="text-base-content/70" />
        <h2 className="text-xs font-black uppercase tracking-widest text-base-content/80">
          Activity History
        </h2>
      </div>

      <div className="relative pl-6 border-l border-base-content/10 flex flex-col gap-6 ml-3 py-1">
        {logs.map((log) => (
          <div key={log.id} className="relative flex flex-col gap-1 text-sm text-base-content/80">
            {/* Timeline Dot with Icon */}
            <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-base-200 border border-base-content/10 flex items-center justify-center shadow-sm">
              {getIcon(log.action)}
            </div>

            <div className="flex flex-wrap items-center gap-x-2 text-xs leading-relaxed">
              {getMessage(log)}
            </div>

            <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-wider">
              {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLogSection;
