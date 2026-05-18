"use client";
import { useSession } from "next-auth/react";
import NavLink from "./NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaUserCircle } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "unauthenticated") {
    return (
      <NavLink
        href="/api/auth/signin"
        label="login"
        className="btn btn-ghost"
      />
    );
  }
  if (status === "loading") {
    return <Skeleton className="h-10 w-10 rounded-full bg-base-content/10" />;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image!} />
          <AvatarFallback>
            <FaUserCircle className="text-5xl" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="bg-base-200 border border-base-content/10 rounded-3xl shadow-2xl p-3 w-56 z-[100]">
        <div className="flex flex-col px-2 py-1.5 mb-2.5 border-b border-base-content/5 gap-0.5">
          <span className="text-[9px] font-black text-base-content/50 uppercase tracking-widest">
            Active Session
          </span>
          <span className="text-xs font-black text-base-content truncate">
            {session?.user?.name || "User Account"}
          </span>
          <span className="text-[10px] font-medium text-base-content/60 truncate">
            {session?.user?.email}
          </span>
        </div>
        <NavLink
          label="Log out"
          href="/api/auth/signout"
          className="btn btn-warning w-full min-h-9 h-9 rounded-xl text-xs font-bold uppercase tracking-wider"
        />
      </PopoverContent>
    </Popover>
  );
};

export default AuthStatus;
