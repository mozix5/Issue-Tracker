import React from "react";
import NavLink from "./NavLink";
import AuthStatus from "./AuthStatus";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];

const NavBar = () => {
  return (
    <div className="flex justify-between items-center py-4">
      <div>IssuesTracker</div>
      <div className="space-x-8">
        {links.map((link) => (
          <NavLink href={link.href} label={link.label} />
        ))}
      </div>
      <AuthStatus/>
    </div>
  );
};

export default NavBar;
