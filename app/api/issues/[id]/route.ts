import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sendAssigneeNotification } from "@/lib/mail";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const { assignedToUserId, title, description, status, priority } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user?.email! }
  });

  const logs = [];
  if (title !== undefined && title !== issue.title) {
    logs.push({
      issueId: issue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "TITLE_CHANGE",
      oldValue: issue.title,
      newValue: title,
    });
  }
  if (description !== undefined && description !== issue.description) {
    logs.push({
      issueId: issue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "DESCRIPTION_CHANGE",
      oldValue: issue.description,
      newValue: description,
    });
  }
  if (status !== undefined && status !== issue.status) {
    logs.push({
      issueId: issue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "STATUS_CHANGE",
      oldValue: issue.status,
      newValue: status,
    });
  }
  if (priority !== undefined && priority !== issue.priority) {
    logs.push({
      issueId: issue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "PRIORITY_CHANGE",
      oldValue: issue.priority,
      newValue: priority,
    });
  }
  if (assignedToUserId !== undefined && assignedToUserId !== issue.assignedToUserId) {
    const oldAssignee = issue.assignedToUserId
      ? await prisma.user.findUnique({ where: { id: issue.assignedToUserId } })
      : null;
    const newAssignee = assignedToUserId
      ? await prisma.user.findUnique({ where: { id: assignedToUserId } })
      : null;
    logs.push({
      issueId: issue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "ASSIGNEE_CHANGE",
      oldValue: oldAssignee?.name || "Unassigned",
      newValue: newAssignee?.name || "Unassigned",
    });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
      status,
      priority,
    },
  });

  if (logs.length > 0) {
    await prisma.activityLog.createMany({
      data: logs,
    });
  }

  if (assignedToUserId !== undefined && assignedToUserId !== issue.assignedToUserId && assignedToUserId) {
    const newAssignee = await prisma.user.findUnique({ where: { id: assignedToUserId } });
    if (newAssignee && newAssignee.email) {
      try {
        await sendAssigneeNotification(
          newAssignee.email,
          newAssignee.name || "User",
          issue.id,
          updatedIssue.title,
          dbUser?.name || "Someone"
        );
      } catch (err) {
        console.error("Failed to send assignee email notification:", err);
      }
    }
  }

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
