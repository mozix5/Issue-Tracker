import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <div className="btn w-48 btn-ghost hover:bg-base-200 min-h-10 h-fit">
        <FiEdit className=" text-sm" />
        <span className="">Edit Issue</span>
      </div>
    </Link>
  );
};

export default EditIssueButton;
