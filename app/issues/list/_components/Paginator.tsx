"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import DropDown from "@/components/shared/DropDown";
import { useTransition } from "react";

type PaginatorProps = {
  itemCount: number;
  currentPage: number;
  pageSize: number;
};

const Paginator = ({ itemCount, currentPage, pageSize }: PaginatorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const pages = Math.ceil(itemCount / pageSize);

  if (pages <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    startTransition(() => {
      router.push("?" + params.toString());
    });
  };

  const pageOptions = Array.from({ length: pages }, (_, index) => ({
    label: (index + 1).toString(),
    id: (index + 1).toString(),
  }));

  return (
    <div className=" flex relative items-center mt-4">
      <div className="flex gap-2 items-center md:absolute left-0">
        <Label className=" whitespace-nowrap">Page</Label>
        <DropDown
          options={pageOptions}
          defaultValue="1"
          query="page"
          disabled={isPending}
          className="w-fit h-10 bg-base-200 rounded-2xl focus:ring-0 text-base-content text-xs font-bold px-4 hover:bg-base-300 transition-colors cursor-pointer"
        />
      </div>
      <Pagination className="px-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`cursor-pointer ${
                (currentPage === 1 || isPending) ? "cursor-not-allowed opacity-50 pointer-events-none" : ""
              }`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${
                (currentPage === pages || isPending) ? "cursor-not-allowed opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Paginator;
