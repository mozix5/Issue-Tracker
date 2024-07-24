import prisma from "@/prisma/client";
import IssueTable, { IssueQuery } from "./IssueTable";
import PageHeader from "./PageHeader";
import Paginator from "@/app/components/Paginator";

type Props = {
  searchParams: IssueQuery;
};
const IssuesPage = async ({ searchParams }: Props) => {
  console.log(searchParams);

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return (
    <div className="pt-8">
      <PageHeader />
      <IssueTable issues={issues} />
      <div>
        <Paginator />
      </div>
    </div>
  );
};

export default IssuesPage;
