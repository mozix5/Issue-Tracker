import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import QuickActions from "./QuickActions";

const page = async () => {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-8 flex flex-col gap-6 min-h-[90vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase">
            Dashboard
          </h1>
          <p className="text-sm text-base-content/70 font-medium">
            Real-time analytics and issue management feed.
          </p>
        </div>
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <IssueSummary open={open} closed={closed} inProgress={inProgress} />
          <IssueChart open={open} closed={closed} inProgress={inProgress} />
        </div>
        <div className="lg:col-span-5 h-full">
          <LatestIssues />
        </div>
      </div>
    </div>
  );
};

export default page;
