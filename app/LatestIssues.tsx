import prisma from "@/prisma/client";
import IssueStatusBadge from "./components/IssueStatusBadge";
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
    },
  });
  return (
    <div className=" w-full flex flex-col p-4 rounded-3xl bg-neutral h-full">
      <div className="text-lg font-semibold my-2 px-2">Lates Issues</div>
      {latestIssues.map((latestIssue) => {
        return (
          <Link href={`/issues/${latestIssue.id}`}>
            <div className=" btn-neutral btn flex justify-start h-14 items-center rounded-2xl px-4">
              <div className="flex-1 text-start mx-1">{latestIssue.title}</div>
              <div className=" text-xs">
                <IssueStatusBadge status={latestIssue.status} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LatestIssues;
