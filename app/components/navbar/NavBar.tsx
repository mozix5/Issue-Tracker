import React from "react";
import NavLink from "./NavLink";
import AuthStatus from "./AuthStatus";
import ThemeSwitcher from "./ThemeSwitcher";
import { BsBugFill } from "react-icons/bs";
import { Menu } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Issues", href: "/issues/list" },
  { label: "Board", href: "/issues/board" },
];

const NavBar = () => {
  return (
    <div className="flex justify-between items-center h-[10vh] px-4 md:px-16 xl:px-48 space-x-2 bg-base-100/50 backdrop-blur-md sticky top-0 z-[100]">
      <div className="flex items-center gap-3">
        <div className="dropdown md:hidden z-[110]">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square rounded-2xl hover:bg-base-200"
          >
            <Menu size={18} />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content mt-3 z-[110] p-2 shadow-2xl bg-base-200 rounded-3xl w-48 gap-1"
          >
            {links.map((link) => (
              <li key={link.label} className="w-full">
                <NavLink
                  href={link.href}
                  label={link.label}
                  className="btn btn-ghost w-full justify-start rounded-2xl hover:bg-base-300"
                />
              </li>
            ))}
          </ul>
        </div>

        <BsBugFill className="text-2xl text-primary" />
        
        <div className="hidden md:flex gap-1">
          {links.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              className="btn btn-ghost rounded-2xl hover:bg-base-200"
            />
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
