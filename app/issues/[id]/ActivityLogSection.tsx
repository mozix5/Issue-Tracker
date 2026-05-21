import prisma from "@/prisma/client";
import { Activity } from "lucide-react";
import ActivityLogList, { SerializedActivityLog } from "./ActivityLogList";

type Props = {
  issueId: number;
};

const ActivityLogSection = async ({ issueId }: Props) => {
  const logs = await prisma.activityLog.findMany({
    where: { issueId },
    orderBy: { createdAt: "desc" },
  });

  if (logs.length === 0) return null;

  const serializedLogs: SerializedActivityLog[] = logs.map((log) => ({
    id: log.id,
    issueId: log.issueId,
    userId: log.userId,
    userName: log.userName,
    action: log.action,
    oldValue: log.oldValue,
    newValue: log.newValue,
    createdAt: log.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col gap-4 bg-base-100 border border-base-content/10 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-base-content/5 pb-3">
        <Activity size={16} className="text-base-content/70" />
        <h2 className="text-xs font-black uppercase tracking-widest text-base-content/80">
          Activity History
        </h2>
      </div>

      <ActivityLogList logs={serializedLogs} />
    </div>
  );
};

export default ActivityLogSection;

