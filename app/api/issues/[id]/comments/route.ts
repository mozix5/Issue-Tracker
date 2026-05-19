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

  // Fetch issue and assignee details
  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      assignedToUser: {
        select: {
          id: true,
          name: true,
          email: true,
        }
      }
    }
  });

  if (issue?.assignedToUser && issue.assignedToUser.email && issue.assignedToUser.id !== userId) {
    try {
      const commenterName = session?.user?.name || "Someone";
      await sendCommentNotification(
        issue.assignedToUser.email,
        issue.assignedToUser.name || "User",
        issueId,
        issue.title,
        commenterName,
        newComment.text
      );
    } catch (err) {
      console.error("Failed to send comment email notification:", err);
    }
  }

  return NextResponse.json(newComment, { status: 201 });
}
