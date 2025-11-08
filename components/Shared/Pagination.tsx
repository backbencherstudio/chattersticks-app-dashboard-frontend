"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-6 select-none">
      {/* Previous */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      {/* Page numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((num) => (
          <Button
            key={num}
            variant={num === currentPage ? "default" : "outline"}
            size="sm"
            className={`${
              num === currentPage
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "hover:bg-blue-50 cursor-pointer"
            }`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </Button>
        ))}
      </div>

      {/* Next */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 cursor-pointer"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
