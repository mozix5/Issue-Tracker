"use client";

import Loader from "@/app/components/Loader";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "sonner";

const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
      toast.success("Issue deleted Successfully");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Unexpected error occurred");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="btn w-full btn-error/10 hover:bg-error/25 text-red-500 border border-red-500/20 text-xs font-bold rounded-xl transition-all duration-200 min-h-11 h-fit flex items-center justify-center gap-2">
          {isDeleting ? (
            <Loader />
          ) : (
            <>
              <MdDeleteForever className="text-lg" />
              <span>Delete Issue</span>
            </>
          )}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-neutral border-none shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Issue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteIssue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteIssueButton;
