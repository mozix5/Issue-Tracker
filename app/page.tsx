import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";

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
    <div className="px-6 xl:px-48 md:px-16 font-medium flex flex-col xl:flex-row gap-6 pt-4 pb-6 lg:h-[90vh]">
      <div className="space-y-6 flex flex-col">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
        <IssueChart open={open} closed={closed} inProgress={inProgress}/>
      </div>
      <div className="flex-1">
        <LatestIssues />
      </div>
    </div>
  );
};

export default page;
