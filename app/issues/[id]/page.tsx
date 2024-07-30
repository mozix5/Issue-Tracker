import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueDetails from "./IssueDetails";
import AssignUser from "./AssignUser";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import ChangeIssueStatusButton from "./ChangeIssueStatusButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";

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
  const session = await getServerSession(AuthOptions);
  const issue = await getIssue(params.id);
  return (
    <div className="px-6 xl:px-48 md:px-16 mt-6 flex flex-col md:flex-row">
      <IssueDetails issueDetails={issue} />
      <div className="flex flex-col gap-4 bg-neutral pr-6 py-6 rounded-r-2xl min-w-48 items-center">
        {session && (
          <>
            <AssignUser
              assignedToUserId={issue.assignedToUserId}
              issueId={params.id}
            />
            <ChangeIssueStatusButton
              issueId={params.id}
              status={issue.status}
            />
            <DeleteIssueButton issueId={params.id} />
            <EditIssueButton issueId={params.id} />
          </>
        )}
      </div>
    </div>
  );
};
export default IssuePage;
