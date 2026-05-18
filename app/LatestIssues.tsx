import prisma from "@/prisma/client";
import IssueStatusBadge from "./components/IssueStatusBadge";
import PriorityBadge from "./components/PriorityBadge";
import { Status, Priority } from "@/lib/types";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
    },
  });

  return (
    <div className="w-full p-6 rounded-3xl bg-base-200 border border-base-content/10 shadow-xl flex flex-col h-full justify-between">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-base-content/75 uppercase tracking-wider">
            Latest Activity
          </span>
          <span className="text-xs text-base-content/50 font-medium">
            Recent issue filings
          </span>
        </div>
        <Link
          href="/issues"
          className="text-xs font-bold text-base-content/60 hover:text-primary transition-colors flex items-center gap-1"
        >
          View all <GoChevronRight />
        </Link>
      </div>

      <div className="flex flex-col gap-3 flex-1 justify-center">
        {latestIssues.length === 0 ? (
          <div className="text-center py-8 text-sm text-base-content/50 font-medium">
            No issues filed recently.
          </div>
        ) : (
          latestIssues.map((latestIssue) => {
            return (
              <Link key={latestIssue.id} href={`/issues/${latestIssue.id}`}>
                <div className="group flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/20 hover:bg-base-100 hover:border-base-content/10 transition-all duration-300">
                  <div className="flex flex-col gap-1 flex-1 min-w-0 pr-3">
                    <span className="text-sm font-semibold text-base-content truncate">
                      {latestIssue.title}
                    </span>
                    <span className="text-[10px] text-base-content/50 font-semibold tracking-wider uppercase">
                      ID #{latestIssue.id}
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <IssueStatusBadge
                      status={latestIssue.status as Status}
                      size="xs"
                    />
                    <PriorityBadge
                      priority={latestIssue.priority as Priority}
                    />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LatestIssues;
