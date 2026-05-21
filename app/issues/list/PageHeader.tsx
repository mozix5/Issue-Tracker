"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import DropDown from "@/app/components/DropDown";

const options = [
  { id: "ALL", label: "all" },
  { id: "OPEN", label: "open" },
  { id: "CLOSED", label: "closed" },
  { id: "IN_PROGRESS", label: "in progress" },
];

const PageHeader = () => {
  const { status } = useSession();

  const handleNewIssueClick = (e: React.MouseEvent) => {
    if (status === "unauthenticated") {
      e.preventDefault();
      toast.error("Access Denied", {
        description: "You must be signed in to create an issue.",
      });
    }
  };

  return (
    <div className="flex justify-between items-center">
      <DropDown
        defaultValue="ALL"
        options={options}
        query="status"
        className="w-fit h-10 bg-base-200 rounded-2xl focus:ring-0 text-base-content text-xs font-bold px-4 hover:bg-base-300 transition-colors cursor-pointer"
      />
      <Link
        href="/issues/new"
        onClick={handleNewIssueClick}
        className="btn btn-primary !text-white text-xs font-black uppercase tracking-widest min-h-10 h-10 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all px-5 flex items-center justify-center"
      >
        New Issue
      </Link>
    </div>
  );
};

export default PageHeader;
