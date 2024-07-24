"use client";
import { useSession } from "next-auth/react";
import NavLink from "./NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "unauthenticated") {
    return <NavLink href="/api/auth/signin" label="login" />;
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarImage src={session?.user?.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div>{session?.user?.email}</div>
          <NavLink
            label="Log out"
            href="/api/auth/signout"
            className="px-0"
            variant="ghost"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AuthStatus;
