'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type UserDropDownProps = {
  assignedToUserId: string | null;
  issueId: string;
};

const UserDropDown = ({ assignedToUserId, issueId }: UserDropDownProps) => {
  const [userOptions, setUserOptions] = useState<{ id: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        const users = response.data.map((user: { id: string; name: string }) => ({
          id: user.id,
          label: user.name || "Unnamed User",
        }));
        setUserOptions([...users, { id: "unassigned", label: "Unassigned" }]);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const assignUserToIssue = async (userId: string) => {
    try {
      await axios.patch("/api/issues/" + issueId, { assignedToUserId: userId });
      toast.success("User assigned successfully");
    } catch (error) {
      toast.error("User could not be assigned");
    }
  };

  if (isLoading) {
    return <Skeleton className="h-10 bg-[#ececec]/10"/>;
  }

  return (
    <Select defaultValue={assignedToUserId || "unassigned"} onValueChange={assignUserToIssue}>
      <SelectTrigger className="capitalize bg-base-100 focus:ring-0 border-none h-10 rounded-xl px-4">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {userOptions.map((option) => (
          <SelectItem value={option.id} key={option.id} className="capitalize">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserDropDown;
