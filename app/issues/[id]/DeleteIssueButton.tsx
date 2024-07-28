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
      toast("Issue deleted Successfully");
    } catch (error) {
      setIsDeleting(false);
      toast("Unexpected error occurred");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="w-48 btn btn-ghost hover:bg-base-200 min-h-10 h-fit">
          {isDeleting ? (
            <Loader />
          ) : (
            <>
              <MdDeleteForever className=" text-lg" />
              <span className="">Delete Issue</span>
            </>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-neutral border-none shadow-xl">
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
