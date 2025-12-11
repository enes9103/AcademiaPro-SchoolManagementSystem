"use client";

import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const safeTotalPages = Math.max(
    1,
    Math.ceil(Number.isFinite(totalPages) ? totalPages : 1)
  );
  const currentPage = Math.min(
    Math.max(1, Number(searchParams.get("page")) || 1),
    safeTotalPages
  );

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, safeTotalPages);

  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm rounded-full border transition",
      {
        "bg-[var(--accent)] text-white border-[var(--accent)] shadow": isActive,
        "hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] bg-[var(--surface)] text-[var(--text-primary)] border-[var(--border)]":
          !isActive && position !== "middle",
        "text-[var(--text-muted)] pointer-events-none bg-transparent border-transparent":
          position === "middle",
      }
    );

    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className}>
        {page}
      </Link>
    );
  };

  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm rounded-full border transition",
      {
        "pointer-events-none text-white bg-[var(--border)] border-[var(--border)]":
          isDisabled,
        "hover:bg-[var(--accent)] bg-[var(--surface)] text-[var(--text-primary)] hover:text-white border-[var(--border)] hover:border-[var(--accent)]":
          !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction === "left" ? (
        <HiChevronLeft size={20} />
      ) : (
        <HiChevronRight size={20} />
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link href={href} className={className}>
        {icon}
      </Link>
    );
  };

  return (
    <div className="mt-3 flex justify-end">
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex -space-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "single" | "middle" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={index}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= safeTotalPages}
        />
      </div>
    </div>
  );
};

export default Pagination;
