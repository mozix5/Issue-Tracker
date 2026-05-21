"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const Toast = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let description = "You must be signed in to perform this action.";
    if (pathname.includes("/board")) {
      description = "You must be signed in to view the Kanban board.";
    } else if (pathname.includes("/new")) {
      description = "You must be signed in to create an issue.";
    }

    toast.error("Access Denied", {
      description,
    });
    router.replace("/");
  }, [router, pathname]);

  return null;
};

export default Toast;
