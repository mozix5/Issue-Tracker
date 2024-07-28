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

export type IssueQuery = {
  status: Status;
  orderBy: keyof Issue;
  page: string;
};

const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <div className="pt-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.label}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <NavLink
                  label={issue.title}
                  href={`${issue.id}`}
                  className="px-0 h-full py-3 w-full flex items-center justify-start text-sm font-normal"
                />
              </TableCell>
              <TableCell>{issue.status}</TableCell>
              <TableCell>{issue.createdAt.toDateString()}</TableCell>
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
export default IssueTable;
