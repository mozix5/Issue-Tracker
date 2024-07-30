import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const IssuesListLoading = () => {
  return (
    <div className="px-6 xl:px-48 md:px-16 pt-4">
      <div className="flex justify-between py-2">
        <Skeleton className="h-8 w-20 rounded-xl bg-[#ececec]/10" />
        <Skeleton className="h-8 w-32 rounded-xl bg-[#ececec]/10" />
      </div>
      <div className="pt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-base-300">
              <TableHead className="px-4">Issue</TableHead>
              <TableHead className="px-4">status</TableHead>
              <TableHead className="px-4 hidden md:table-cell">Assigned To</TableHead>
              <TableHead className="px-4 hidden lg:table-cell">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index} className="even:bg-[#36434d]/10">
                <TableCell className="px-4 py-3 rounded-l-xl">
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
                <TableCell className="space-x-2 hidden md:table-cell">
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
                <TableCell className="rounded-r-xl hidden lg:table-cell">
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssuesListLoading;
