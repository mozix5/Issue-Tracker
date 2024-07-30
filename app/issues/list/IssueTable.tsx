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

export type IssueWithAssignedUser = Issue & {
  assignedToUser: {
    name: string | null;
    image: string | null;
  } | null;
};

const IssueTable = ({
  issues,
  searchParams,
}: {
  issues: IssueWithAssignedUser[];
  searchParams: IssueQuery;
}) => {
  return (
    <div className="pt-4">
      <Table>
        <TableHeader>
          <TableRow className="bg-base-300">
            {columns.map((column) => (
              <TableHead key={column.label} className={column.className} >
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
              <TableCell>
                <IssueStatusBadge size="xs" status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.assignedToUser?.name || "Unassigned"}
                {issue.assignedToUser?.image && (
                  <img
                    src={issue.assignedToUser.image}
                    alt={issue.assignedToUser.name || "User"}
                    className="w-6 h-6 rounded-full inline-block ml-2"
                  />
                )}
              </TableCell>
              <TableCell className="rounded-r-xl hidden lg:table-cell">
                {new Date(issue.createdAt).toLocaleDateString()}
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
  value: keyof IssueWithAssignedUser;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status" },
  { label: "Assigned To", value: "assignedToUser", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden lg:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
