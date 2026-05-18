import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/edit/${issueId}`} className="w-full">
      <div className="btn w-full btn-neutral border border-zinc-800 hover:bg-zinc-800 text-zinc-200 text-xs font-bold rounded-xl transition-all duration-200 min-h-11 h-fit flex items-center justify-center gap-2">
        <FiEdit className="text-sm" />
        <span>Edit Issue</span>
      </div>
    </Link>
  );
};

export default EditIssueButton;
