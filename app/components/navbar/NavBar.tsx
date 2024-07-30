import React from "react";
import NavLink from "./NavLink";
import AuthStatus from "./AuthStatus";
import { BsBugFill } from "react-icons/bs";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];

const NavBar = () => {
  return (
    <div className="flex justify-between items-center h-[10vh] px-6 xl:px-48 md:px-16 space-x-2">
      <BsBugFill className="text-2xl"/>
      <div className="flex-1">
        {links.map((link) => (
          <NavLink key={link.label} href={link.href} label={link.label} className="btn btn-ghost" />
        ))}
      </div>
      <AuthStatus/>
    </div>
  );
};

export default NavBar;
