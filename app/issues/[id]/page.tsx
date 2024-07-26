import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import IssueDetails from "./IssueDetails";
import AssignUser from "./AssignUser";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";

type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  assignedToUserId: string | null;
} | null;

export const getIssue = cache(async (id: string) => {
  const res: Issue = await prisma.issue.findUnique({
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
    <div className="px-48">
      <IssueDetails />
      <AssignUser />
      <DeleteIssueButton />
      <EditIssueButton />
    </div>
  );
};
export default IssuePage;
