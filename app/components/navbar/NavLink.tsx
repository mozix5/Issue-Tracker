import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NavLink = ({
  href,
  label,
  className,
  variant="link",
}: {
  href: string;
  label: string;
  className?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) => {
  return (
    <Button asChild variant={variant} className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavLink;
