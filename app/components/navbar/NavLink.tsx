import Link from "next/link";
import React from "react";

const NavLink = ({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) => {
  return (
    <Link href={href}>
      <div className={className}>{label}</div>
    </Link>
  );
};

export default NavLink;
