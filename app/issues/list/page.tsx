import prisma from "@/prisma/client";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import PageHeader from "./PageHeader";
import Paginator from "./Paginator";
import { cache } from "react";
import { Status } from "@prisma/client";
import type { Prisma } from "@prisma/client"; // Import Prisma types

type Props = {
  searchParams: IssueQuery;
};

const fetchIssues = cache(
  async (
    page: number,
    pageSize: number,
    where: Prisma.IssueWhereInput,
    orderBy: Prisma.IssueOrderByWithRelationInput
  ) => {
    const [issues, totalIssues] = await Promise.all([
      prisma.issue.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy,
      }),
      prisma.issue.count({
        where,
      }),
    ]);
    return { issues, totalIssues };
  }
);

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where: Prisma.IssueWhereInput = status ? { status } : {};

  const orderBy: Prisma.IssueOrderByWithRelationInput = columnNames.includes(
    searchParams.orderBy
  )
    ? { [searchParams.orderBy]: "asc" }
    : {};

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const { issues, totalIssues } = await fetchIssues(
    page,
    pageSize,
    where,
    orderBy
  );

  return (
    <div className="pt-4 px-48 h-[90vh] flex flex-col">
      <PageHeader />
      <div className="h-full">
        <IssueTable issues={issues} searchParams={searchParams} />
        <Paginator
          itemCount={totalIssues}
          pageSize={pageSize}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default IssuesPage;
