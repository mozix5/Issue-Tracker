"use client";

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

const ChangeIssueStatusButton = async ({
  issueId,
  status,
}: ChangeStatusProps) => {
  const router = useRouter();
  const changeStatus = async (newStatus: string) => {
    try {
      await axios.patch("/api/issues/" + issueId, { status: newStatus });
      router.refresh()
      toast("Status changed successfully");
    } catch (error) {
      toast("Unexpected error occurred");
    }
  };
  return (
    <div className="w-48">
      <Select defaultValue={status} onValueChange={changeStatus}>
        <SelectTrigger className="capitalize bg-base-100 focus:ring-0 border-none h-10 rounded-xl px-4">
          <SelectValue />
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
