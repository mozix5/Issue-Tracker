import IssueForm from "@/app/components/form/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const getIssue = async (id: string) => {
  const res = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  if (!res) notFound();
  return res;
};

const EditPage = async ({ params }: { params: { id: string } }) => {
  const issue = await getIssue(params.id);
  return (
    <div className="px-48 pt-4">
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditPage;
