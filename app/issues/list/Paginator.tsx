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
import DropDown from "../../components/DropDown";

type PaginatorProps = {
  itemCount: number;
  currentPage: number;
  pageSize: number;
};

const Paginator = ({ itemCount, currentPage, pageSize }: PaginatorProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = Math.ceil(itemCount / pageSize);

  if (pages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const pageOptions = Array.from({ length: pages }, (_, index) => ({
    label: (index + 1).toString(),
    id: (index + 1).toString(),
  }));

  return (
    <div className=" flex relative items-center mt-4">
      <div className="flex gap-2 items-center absolute left-0">
        <Label className=" whitespace-nowrap">Page</Label>
        <DropDown options={pageOptions} defaultValue="1" />
      </div>
      <Pagination className="px-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={`cursor-pointer ${
                currentPage === 1 && "cursor-not-allowed opacity-50"
              }`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={`cursor-pointer ${
                currentPage === pages && "cursor-not-allowed opacity-50"
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
