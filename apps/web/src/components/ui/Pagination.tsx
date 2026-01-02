"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ currentPage, totalPages, totalItems, itemsPerPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border-subtle">
      <div className="text-sm text-text-muted">
        Showing <span className="font-medium">{startItem}</span> to{" "}
        <span className="font-medium">{endItem}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </div>
      <div className="flex items-center gap-1">
        <Link
          href={createPageURL(currentPage - 1)}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            currentPage === 1
              ? "text-text-muted cursor-not-allowed pointer-events-none"
              : "text-text-secondary hover:bg-elevated"
          }`}
          aria-disabled={currentPage === 1}
        >
          Previous
        </Link>

        {getPageNumbers().map((page, index) => (
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-text-muted">...</span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page as number)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                currentPage === page
                  ? "bg-accent text-white"
                  : "text-text-secondary hover:bg-elevated"
              }`}
            >
              {page}
            </Link>
          )
        ))}

        <Link
          href={createPageURL(currentPage + 1)}
          className={`px-3 py-1.5 rounded-lg text-sm ${
            currentPage === totalPages
              ? "text-text-muted cursor-not-allowed pointer-events-none"
              : "text-text-secondary hover:bg-elevated"
          }`}
          aria-disabled={currentPage === totalPages}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
