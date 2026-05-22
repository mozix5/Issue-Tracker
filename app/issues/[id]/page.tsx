import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Sliders, UserCircle2, Tag, Pencil, Clock} from "lucide-react";
import IssueDetails from "./IssueDetails";
import AssignUser from "./AssignUser";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import ChangeIssueStatusButton from "./ChangeIssueStatusButton";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
import CommentsSection from "./CommentsSection";
import ActivityLogSection from "./ActivityLogSection";
import CopyLinkButton from "./CopyLinkButton";

export const dynamic = "force-dynamic";

const getIssue = cache(async (id: string) => {
  const res = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!res) return notFound();
  return res;
});

const IssuePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(AuthOptions);
  const issue = await getIssue(params.id);

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-10 flex flex-col lg:flex-row gap-8 min-h-[90vh] items-start">

      <div className="w-full flex-1 flex flex-col gap-6 min-w-0">
        <IssueDetails issueDetails={issue} />
        <ActivityLogSection issueId={issue.id} />
        <CommentsSection issueId={params.id} />
      </div>

      {session && (
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4 lg:sticky lg:top-24">

          <div className="flex items-center gap-2.5 px-1">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Sliders size={13} />
            </div>
            <div>
              <p className="text-xs font-black text-base-content uppercase tracking-widest leading-none">Control Panel</p>
              <p className="text-[9px] text-base-content/40 font-bold uppercase tracking-wider mt-0.5">Manage ticket</p>
            </div>
          </div>

          <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-base-content/40 uppercase tracking-widest">
              <UserCircle2 size={11} />
              <span>Assignee</span>
            </div>
            <AssignUser assignedToUserId={issue.assignedToUserId} issueId={params.id} />
          </div>

          <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-base-content/40 uppercase tracking-widest">
              <Tag size={11} />
              <span>Status</span>
            </div>
            <ChangeIssueStatusButton issueId={params.id} status={issue.status} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-1 text-[9px] font-black text-base-content/40 uppercase tracking-widest">
              <Pencil size={9} />
              <span>Actions</span>
            </div>
            <EditIssueButton issueId={params.id} />
            <DeleteIssueButton issueId={params.id} />
          </div>

          <div className="bg-base-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm mt-1">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-base-content/40 uppercase tracking-widest">
              <Clock size={11} />
              <span>Issue Info</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-wider">ID</span>
                <span className="text-[11px] font-black text-base-content/70 font-mono">#{issue.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-wider">Created</span>
                <span className="text-[11px] font-semibold text-base-content/70">
                  {issue.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-wider">Updated</span>
                <span className="text-[11px] font-semibold text-base-content/70">
                  {issue.updatedAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            </div>

            <CopyLinkButton />
          </div>

        </div>
      )}
    </div>
  );
};

export default IssuePage;
