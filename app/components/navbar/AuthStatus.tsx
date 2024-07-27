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
    return <Skeleton className="h-10 w-10 rounded-full bg-[#ececec]/10" />;
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
      <PopoverContent className="bg-base-300 border-none rounded-2xl">
        <div className="py-4 px-2 text-neutral-content">
          {session?.user?.email}
        </div>
        <NavLink
          label="Log out"
          href="/api/auth/signout"
          className=" btn btn-warning w-full min-h-10 h-10"
        />
      </PopoverContent>
    </Popover>
  );
};

export default AuthStatus;
