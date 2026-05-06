import prisma from "@/prisma/client";
import IssueStatusBadge from "./components/IssueStatusBadge";
import PriorityBadge from "./components/PriorityBadge";
import { Status, Priority } from "@/lib/types";
import Link from "next/link";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: {
      id: true,
      title: true,
      status: true,
      priority: true,
    },
  });
  return (
    <div className="w-full flex flex-col p-4 rounded-3xl bg-neutral">
      <div className="text-xl font-semibold my-2 px-2">Lates Issues</div>
      {latestIssues.map((latestIssue) => {
        return (
          <Link key={latestIssue.id} href={`/issues/${latestIssue.id}`}>
            <div className="btn-neutral btn flex justify-start h-16 items-center rounded-2xl px-4">
              <div className="flex-1 text-start mr-4">{latestIssue.title}</div>
              <div className="text-xs flex gap-2">
                <PriorityBadge priority={latestIssue.priority as Priority} />
                <IssueStatusBadge status={latestIssue.status as Status} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LatestIssues;
