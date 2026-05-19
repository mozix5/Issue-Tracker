"use client";

import React, { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

type ThemeOption = {
  id: string;
  label: string;
  colorBg: string;
  colorAccent: string;
};

const themes: ThemeOption[] = [
  { id: "dim", label: "Dim (Default)", colorBg: "bg-[#2A303C]", colorAccent: "bg-[#9b5de5]" },
  { id: "sunset", label: "Sunset", colorBg: "bg-[#1F1A24]", colorAccent: "bg-[#FF7E67]" },
  { id: "nord", label: "Nord", colorBg: "bg-[#2E3440]", colorAccent: "bg-[#88C0D0]" },
  { id: "coffee", label: "Coffee", colorBg: "bg-[#20161F]", colorAccent: "bg-[#DB924B]" },
];

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState("dim");

  useEffect(() => {
    // Read local storage on mount
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setActiveTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    localStorage.setItem("theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-2xl flex items-center gap-2 border border-base-content/5 hover:bg-base-200"
      >
        <Palette size={15} className="text-base-content/80" />
        <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">
          Theme
        </span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[100] menu p-2.5 shadow-2xl bg-base-200 border border-base-content/10 rounded-3xl w-48 gap-1.5 mt-2"
      >


        {themes.map((theme) => {
          const isSelected = activeTheme === theme.id;
          return (
            <li key={theme.id}>
              <button
                onClick={() => handleThemeChange(theme.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-100 text-base-content/80 hover:text-base-content"
                }`}
              >
                <div className="flex items-center gap-2">
                  {/* Small preview color pills */}
                  <div className="flex items-center gap-0.5 border border-base-content/10 p-0.5 rounded-md bg-base-300">
                    <div className={`w-2.5 h-2.5 rounded ${theme.colorBg}`}></div>
                    <div className={`w-2.5 h-2.5 rounded ${theme.colorAccent}`}></div>
                  </div>
                  <span>{theme.label}</span>
                </div>
                {isSelected && <Check size={12} className="stroke-[3px]" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
