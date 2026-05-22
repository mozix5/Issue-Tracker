import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { commentId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const commentId = parseInt(params.commentId);
    if (isNaN(commentId)) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }

    const body = await request.json();
    const { voteChange } = body; // e.g. +1, -1, +2, -2

    const parsedChange = parseInt(voteChange);
    if (isNaN(parsedChange)) {
      return NextResponse.json({ error: "Invalid vote change" }, { status: 400 });
    }

    const updatedComment = await (prisma.comment.update as any)({
      where: { id: commentId },
      data: {
        upvotes: {
          increment: parsedChange,
        },
      },
    });

    return NextResponse.json({ upvotes: (updatedComment as any).upvotes });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    console.error("Failed to patch vote", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
