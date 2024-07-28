import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import NavLink from "@/app/components/navbar/NavLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Issue, Status } from "@prisma/client";
import Link from "next/link";

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

const IssueTable = ({
  issues,
  searchParams,
}: {
  issues: Issue[];
  searchParams: IssueQuery;
}) => {
  return (
    <div className="pt-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-base-300">
            {columns.map((column) => (
              <TableHead key={column.label}>
                <Link
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  <div className="w-full h-full flex items-center px-4">
                    {column.label}
                  </div>
                </Link>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} className="even:bg-[#36434d]/10">
              <TableCell className="px-0 rounded-l-xl">
                <NavLink
                  label={issue.title}
                  href={`${issue.id}`}
                  className="px-4 h-full py-3 w-full flex items-center justify-start text-sm font-normal"
                />
              </TableCell>
              <TableCell className="">
                {<IssueStatusBadge size="xs" status={issue.status} />}
              </TableCell>
              <TableCell className="rounded-r-xl">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
