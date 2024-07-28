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
    <div className="px-48 pt-4">
      <div className="flex justify-between py-2">
        <Skeleton className="h-8 w-20 bg-[#ececec]/10" />
        <Skeleton className="h-8 w-32 bg-[#ececec]/10" />
      </div>
      <div className="pt-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-base-300">
              <TableHead className="px-4">Issue</TableHead>
              <TableHead className="px-4">status</TableHead>
              <TableHead className="px-4">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index} className="even:bg-[#36434d]/10">
                <TableCell className="px-4 py-3 rounded-l-xl">
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
                <TableCell className="">
                  <Skeleton className="h-5 bg-[#ececec]/10" />
                </TableCell>
                <TableCell className="rounded-r-xl">
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
