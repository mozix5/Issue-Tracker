import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { sendCommentNotification } from "@/lib/mail";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  const comments = await prisma.comment.findMany({
    where: { issueId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc", // Sorted chronologically so recursive threaded rendering builds correctly
    },
  });

  return NextResponse.json(comments);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issueId = parseInt(params.id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
  }

  const body = await request.json();
  const { text, parentId } = body;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return NextResponse.json({ error: "Comment text is required." }, { status: 400 });
  }

  const parsedParentId = parentId ? parseInt(parentId) : null;

  const session = await getServerSession(authOptions);

  let userId: string | null = null;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      userId = user.id;
    }
  }

  const newComment = await prisma.comment.create({
    data: {
      text: text.trim(),
      issueId,
      userId,
      parentId: parsedParentId,
    } as any,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  // Fetch issue with both assignee and creator
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      assignedToUser: { select: { id: true, name: true, email: true } },
      createdByUser:  { select: { id: true, name: true, email: true } },
    },
  });

  const commenterName = session?.user?.name || "Someone";
  const notified = new Set<string>(); // prevent duplicate emails

  // Notify assignee (unless they are the commenter)
  if (issue?.assignedToUser?.email && issue.assignedToUser.id !== userId) {
    try {
      await sendCommentNotification(
        issue.assignedToUser.email,
        issue.assignedToUser.name || "User",
        issueId,
        issue!.title,
        commenterName,
        newComment.text
      );
      notified.add(issue.assignedToUser.id);
    } catch (err) {
      console.error("Failed to send comment email to assignee:", err);
    }
  }

  // Notify creator (unless they are the commenter, or already notified as assignee)
  if (
    issue?.createdByUser?.email &&
    issue.createdByUser.id !== userId &&
    !notified.has(issue.createdByUser.id)
  ) {
    try {
      await sendCommentNotification(
        issue.createdByUser.email,
        issue.createdByUser.name || "User",
        issueId,
        issue!.title,
        commenterName,
        newComment.text
      );
    } catch (err) {
      console.error("Failed to send comment email to creator:", err);
    }
  }

  return NextResponse.json(newComment, { status: 201 });
}
