"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Plus, AlertCircle, Clock } from "lucide-react";

const QuickActions = () => {
  const { status } = useSession();

  const actions = [
    {
      title: "New Ticket",
      href: "/issues/new",
      icon: <Plus className="text-blue-500 w-4 h-4" />,
      bg: "bg-blue-500/10 hover:bg-blue-500/20",
      requiresAuth: true,
    },
    {
      title: "Open Issues",
      href: "/issues/list?status=OPEN",
      icon: <AlertCircle className="text-red-500 w-4 h-4" />,
      bg: "bg-red-500/10 hover:bg-red-500/20",
      requiresAuth: false,
    },
    {
      title: "In Progress",
      href: "/issues/list?status=IN_PROGRESS",
      icon: <Clock className="text-violet-500 w-4 h-4" />,
      bg: "bg-violet-500/10 hover:bg-violet-500/20",
      requiresAuth: false,
    },
  ];

  const handleActionClick = (e: React.MouseEvent, action: typeof actions[0]) => {
    if (action.requiresAuth && status === "unauthenticated") {
      e.preventDefault();
      toast.error("Access Denied", {
        description: "You must be signed in to create an issue.",
      });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {actions.map((action) => (
        <Link 
          key={action.title} 
          href={action.href}
          onClick={(e) => handleActionClick(e, action)}
        >
          <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md cursor-pointer text-xs font-semibold text-base-content/90 hover:text-base-content ${action.bg}`}>
            {action.icon}
            <span>{action.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickActions;
