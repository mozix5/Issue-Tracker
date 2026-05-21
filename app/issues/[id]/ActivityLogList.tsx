"use client";

import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  ClipboardList,
  RefreshCw,
  UserPlus,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export type SerializedActivityLog = {
  id: number;
  issueId: number;
  userId: string | null;
  userName: string | null;
  action: string;
  oldValue: string | null;
  newValue: string | null;
  createdAt: string;
};

type Props = {
  logs: SerializedActivityLog[];
  initialCount?: number;
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

const getMessage = (log: SerializedActivityLog) => {
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

const ActivityLogList = ({ logs, initialCount = 3 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayLogs = isExpanded ? logs : logs.slice(0, initialCount);
  const remainingCount = logs.length - initialCount;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative pl-6 flex flex-col gap-6 ml-3 py-1 transition-all duration-300">
        {displayLogs.map((log) => (
          <div
            key={log.id}
            className="relative flex flex-col gap-1 text-sm text-base-content/80 animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-base-200 flex items-center justify-center shadow-sm">
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

      {logs.length > initialCount && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-sm btn-ghost gap-2 text-xs text-base-content/60 hover:text-base-content hover:bg-base-300/30 rounded-2xl w-full mt-2 transition-all flex items-center justify-center py-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={14} className="animate-bounce" style={{ animationDuration: '2s' }} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={14} className="animate-bounce" style={{ animationDuration: '2s' }} />
              Show More ({remainingCount} hidden)
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ActivityLogList;
