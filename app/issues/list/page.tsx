import prisma from "@/prisma/client";
import IssueTable, { IssueQuery } from "./IssueTable";
import PageHeader from "./PageHeader";
import Paginator from "./Paginator";

type Props = {
  searchParams: IssueQuery;
};
const IssuesPage = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const totalIssues = await prisma.issue.count();
  return (
    <div className="pt-8 px-48">
      <PageHeader />
      <IssueTable issues={issues} />
      <Paginator
        itemCount={totalIssues}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default IssuesPage;
