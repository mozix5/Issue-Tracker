"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const NavLink = ({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) => {
  const { status } = useSession();

  const handleClick = (e: React.MouseEvent) => {
    if (href === "/issues/board" && status === "unauthenticated") {
      e.preventDefault();
      toast.error("Access Denied", {
        description: "You must be signed in to view the Kanban board.",
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      <div className={className}>{label}</div>
    </Link>
  );
};

export default NavLink;
