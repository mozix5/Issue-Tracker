"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import axios from "axios";
import { Issue} from "@prisma/client";
import PriorityBadge from "@/app/components/PriorityBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle } from "react-icons/fa";
import { Status, Priority } from "@/lib/types";
import { toast } from "sonner";
import Link from "next/link";

type IssueWithUser = Issue & { assignedToUser: { name: string | null; image: string | null } | null };

type KanbanBoardProps = {
  initialIssues: IssueWithUser[];
};

const columns = [
  { id: Status.OPEN, title: "Open" },
  { id: Status.IN_PROGRESS, title: "In Progress" },
  { id: Status.CLOSED, title: "Closed" },
];

const KanbanBoard = ({ initialIssues }: KanbanBoardProps) => {
  const [issues, setIssues] = useState(initialIssues);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const issueId = parseInt(draggableId.replace("issue-", ""));
    const newStatus = destination.droppableId as Status;
    const previousStatus = source.droppableId as Status;

    const updatedIssues = issues.map((issue) =>
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    );
    
    setIssues(updatedIssues);

    if (newStatus !== previousStatus) {
      try {
        await axios.patch(`/api/issues/${issueId}`, { status: newStatus });
        toast.success(`Issue moved to ${newStatus}`);
      } catch (error) {
        toast.error("Failed to update issue status.");
        setIssues(issues);
      }
    }
  };

  if (!isMounted) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-full items-start min-w-max w-full pb-4">
        {columns.map((column) => {
          const columnIssues = issues.filter((issue) => issue.status === column.id);

          return (
            <div
              key={column.id}
              className="flex flex-col flex-1 min-w-[320px] max-h-[100%]"
            >
              <div className="flex items-center justify-between py-3 px-1 shrink-0 mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-black uppercase tracking-widest text-base-content">
                    {column.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-base-200 text-[10px] font-bold text-base-content/60">
                    {columnIssues.length}
                  </span>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 overflow-y-auto p-2 min-h-[150px] rounded-3xl transition-colors ${
                      snapshot.isDraggingOver ? "bg-base-200/30" : "bg-transparent"
                    }`}
                  >
                    {columnIssues.map((issue, index) => (
                      <Draggable
                        key={issue.id}
                        draggableId={`issue-${issue.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-3 p-4 bg-base-200 rounded-2xl shadow-md transition-all flex flex-col gap-3 ${
                              snapshot.isDragging
                                ? "shadow-2xl ring-2 ring-primary scale-[1.02] rotate-1"
                                : "hover:shadow-lg hover:-translate-y-0.5"
                            }`}
                          >
                            <Link href={`/issues/${issue.id}`} className="block">
                              <h3 className="text-sm font-bold text-base-content hover:opacity-75 transition-colors cursor-pointer line-clamp-2">
                                {issue.title}
                              </h3>
                            </Link>

                            <div className="flex items-center justify-between mt-2">
                              <PriorityBadge priority={issue.priority as Priority} />
                              
                              <Avatar className="w-6 h-6">
                                {issue.assignedToUser?.image ? (
                                  <AvatarImage src={issue.assignedToUser.image} />
                                ) : (
                                  <AvatarFallback className="bg-base-300 text-base-content/50 text-[10px]">
                                    <FaUserCircle className="text-sm" />
                                  </AvatarFallback>
                                )}
                              </Avatar>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
