"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationControls({
  currentPage,
  pageCount,
}: {
  currentPage: number;
  pageCount: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pageCount <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const handlePageChange = (e: React.MouseEvent, newPage: number) => {
    // Let ctrl/cmd/shift/middle-click open in a new tab/window as usual.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();

    router.push(hrefFor(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pageCount;

  return (
    <Pagination className="mt-12">
      <PaginationContent className="gap-4">
        <PaginationItem>
          <PaginationPrevious
            href={hrefFor(Math.max(1, currentPage - 1))}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            onClick={(e) =>
              isFirstPage
                ? e.preventDefault()
                : handlePageChange(e, currentPage - 1)
            }
            className={`${
              isFirstPage
                ? "opacity-40 pointer-events-none"
                : "hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors rounded-full"
            } border-none`}
          />
        </PaginationItem>

        <PaginationItem>
          <div className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium tracking-tight">
            <span className="text-foreground">{currentPage}</span>
            <span className="text-muted-foreground/50 font-light">/</span>
            <span className="text-muted-foreground">{pageCount}</span>
          </div>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={hrefFor(Math.min(pageCount, currentPage + 1))}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            onClick={(e) =>
              isLastPage
                ? e.preventDefault()
                : handlePageChange(e, currentPage + 1)
            }
            className={`${
              isLastPage
                ? "opacity-40 pointer-events-none"
                : "hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors rounded-full"
            } border-none`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
