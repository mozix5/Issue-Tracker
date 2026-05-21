import prisma from "@/prisma/client";
import KanbanBoard from "./KanbanBoard";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
import Toast from "@/app/components/Toast";

export const dynamic = "force-dynamic";

const BoardPage = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <Toast />;
  }

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedToUser: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-8 flex flex-col gap-6 h-[90vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase">
            Kanban Board
          </h1>
          <p className="text-sm text-base-content/70 font-medium">
            Drag and drop issues to visually update their status.
          </p>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <KanbanBoard initialIssues={issues} />
      </div>
    </div>
  );
};

export default BoardPage;
