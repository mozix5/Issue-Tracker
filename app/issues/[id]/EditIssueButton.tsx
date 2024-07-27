import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <div className="btn btn-outline bg-base-100 btn-warning w-48 min-h-10 h-fit">
        <FiEdit className=" text-md" />
        <span className="">Edit Issue</span>
      </div>
    </Link>
  );
};

export default EditIssueButton;
