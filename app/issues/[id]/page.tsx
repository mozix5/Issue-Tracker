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
import CommentsSection from "./CommentsSection";
import ActivityLogSection from "./ActivityLogSection";

const getIssue = cache(async (id: string) => {
  const res = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!res) return notFound();

  return res;
});

import { Sliders } from "lucide-react";

const IssuePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(AuthOptions);
  const issue = await getIssue(params.id);
  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-8 flex flex-col lg:flex-row gap-6 min-h-[90vh]">
      <div className="flex-1 flex flex-col gap-6">
        <IssueDetails issueDetails={issue} />
        <ActivityLogSection issueId={issue.id} />
        <CommentsSection issueId={params.id} />
      </div>
      {session && (
        <div className="lg:w-72 flex flex-col gap-5 p-6 bg-base-200 border border-base-content/10 shadow-xl rounded-3xl h-fit items-stretch">
          <div className="flex items-center gap-3 border-b border-base-content/10 pb-4 mb-1">
            <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
              <Sliders size={15} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-base-content uppercase tracking-widest">
                Control Panel
              </span>
              <span className="text-[9px] text-base-content/50 font-bold uppercase tracking-wider mt-0.5">
                Manage ticket state
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black text-base-content/50 uppercase tracking-widest pl-1">
              Assignee
            </label>
            <AssignUser
              assignedToUserId={issue.assignedToUserId}
              issueId={params.id}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-black text-base-content/50 uppercase tracking-widest pl-1">
              Ticket Status
            </label>
            <ChangeIssueStatusButton
              issueId={params.id}
              status={issue.status}
            />
          </div>

          <div className="border-t border-base-content/10 my-1"></div>

          <div className="flex flex-col gap-2.5">
            <EditIssueButton issueId={params.id} />
            <DeleteIssueButton issueId={params.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssuePage;
