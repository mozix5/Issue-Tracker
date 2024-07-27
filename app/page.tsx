import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

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
    <div className="px-48 font-medium flex space-x-6 pt-4 pb-6 h-[90vh]">
      <div className="">
        <IssueSummary open={open} closed={closed} inProgress={inProgress} />
      </div>
      <div className="flex-1">
        <LatestIssues />
      </div>
    </div>
  );
};

export default page;
