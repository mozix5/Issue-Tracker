import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import { issueSchema } from '@/app/validationSchemas';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user?.email! }
  });

  const newIssue = await prisma.issue.create({
    data: { 
      title: body.title, 
      description: body.description,
      priority: body.priority || "MEDIUM",
      createdByUserId: dbUser?.id,
    },
  });

  await prisma.activityLog.create({
    data: {
      issueId: newIssue.id,
      userId: dbUser?.id,
      userName: dbUser?.name,
      action: "CREATED",
      newValue: body.title
    }
  });

  return NextResponse.json(newIssue, { status: 201 });
}
