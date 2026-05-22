"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

type UserDropDownProps = {
  assignedToUserId: string | null;
  issueId: string;
};

type UserOptions = {
  id: string;
  name: string;
  image?: string;
};

const UserDropDown = ({ assignedToUserId, issueId }: UserDropDownProps) => {
  const router = useRouter();
  const [userOptions, setUserOptions] = useState<UserOptions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        const users = response.data.map((user: UserOptions) => ({
          id: user.id,
          name: user.name || "Unnamed User",
          image: user.image,
        }));
        setUserOptions([...users, { id: "unassigned", name: "Unassigned" }]);
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  const assignUserToIssue = async (userId: string) => {
    setIsAssigning(true);
    try {
      await axios.patch("/api/issues/" + issueId, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      router.refresh();
      if (userId === "unassigned") {
        toast.success("User unassigned successfully");
      } else {
        toast.success("User assigned successfully");
      }
    } catch (error) {
      toast.error("User could not be assigned");
    } finally {
      setIsAssigning(false);
    }
  };

  if (isLoading) {
    return <Skeleton className="h-10 rounded-xl bg-base-content/10" />;
  }

  return (
    <Select defaultValue={assignedToUserId || "unassigned"} onValueChange={assignUserToIssue} disabled={isAssigning}>
      <SelectTrigger className="capitalize bg-base-100 focus:ring-0 border-none h-11 rounded-xl px-4 w-full flex items-center justify-between">
        {isAssigning ? (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-xs text-primary"></span>
            <span className="text-xs text-base-content/50">Assigning...</span>
          </div>
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent>
        {userOptions.map((option) => (
          <SelectItem
            value={option.id}
            key={option.id}
            className="capitalize px-2"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={option.image} />
                <AvatarFallback>
                  <FaUser />
                </AvatarFallback>
              </Avatar>

              {option.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default UserDropDown;
