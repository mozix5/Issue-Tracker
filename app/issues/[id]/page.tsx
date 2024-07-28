import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueDetails from "./IssueDetails";
import AssignUser from "./AssignUser";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import ChangeIssueStatusButton from "./ChangeIssueStatusButton";

const getIssue = cache(async (id: string) => {
  const res = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!res) return notFound();

  return res;
});

const IssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await getIssue(params.id);
  return (
    <div className="px-48 mt-6 flex">
      <IssueDetails issueDetails={issue} />
      <div className="flex flex-col gap-4 bg-neutral pr-6 pt-6 rounded-r-2xl">
        <AssignUser
          assignedToUserId={issue.assignedToUserId}
          issueId={params.id}
        />
        <ChangeIssueStatusButton issueId={params.id} status={issue.status} />
        <DeleteIssueButton issueId={params.id} />
        <EditIssueButton issueId={params.id} />
      </div>
    </div>
  );
};
export default IssuePage;
