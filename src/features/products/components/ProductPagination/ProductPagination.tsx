"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({ page, totalPages, onPageChange }: Props) {
  // Generate page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Numeric Pages */}
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Button
            key={p}
            variant={page === p ? "default" : "ghost"}
            size="sm"
            className={cn("w-9", page === p ? "bg-blue-600" : "")}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}