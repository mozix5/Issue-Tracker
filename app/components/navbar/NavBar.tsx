import React from "react";
import NavLink from "./NavLink";
import AuthStatus from "./AuthStatus";
import ThemeSwitcher from "./ThemeSwitcher";
import { BsBugFill } from "react-icons/bs";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
];

const NavBar = () => {
  return (
    <div className="flex justify-between items-center h-[10vh] px-6 xl:px-48 md:px-16 space-x-2">
      <div className="flex items-center gap-3">
        <BsBugFill className="text-2xl text-primary" />
        <div className="flex gap-1">
          {links.map((link) => (
            <NavLink key={link.label} href={link.href} label={link.label} className="btn btn-ghost rounded-2xl border border-base-content/5 hover:bg-base-200" />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <AuthStatus />
      </div>
    </div>
  );
};

export default NavBar;
