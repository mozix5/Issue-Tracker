"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ChangeStatusProps = {
  issueId: string;
  status: string;
};

const ChangeIssueStatusButton = ({
  issueId,
  status,
}: ChangeStatusProps) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const changeStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      await axios.patch("/api/issues/" + issueId, { status: newStatus });
      router.refresh();
      toast.success("Status changed successfully");
    } catch (error) {
      toast.error("Unexpected error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full">
      <Select defaultValue={status} onValueChange={changeStatus} disabled={isUpdating}>
        <SelectTrigger className="capitalize bg-base-100 focus:ring-0 border-none h-11 rounded-xl px-4 w-full flex items-center justify-between">
          {isUpdating ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-xs text-primary"></span>
              <span className="text-xs text-base-content/50">Updating...</span>
            </div>
          ) : (
            <SelectValue />
          )}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CLOSED" className="capitalize">
            close
          </SelectItem>
          <SelectItem value="OPEN" className="capitalize">
            open
          </SelectItem>
          <SelectItem value="IN_PROGRESS" className="capitalize">
            in progress
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChangeIssueStatusButton;
