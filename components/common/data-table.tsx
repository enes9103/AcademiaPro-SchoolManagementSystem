"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Table } from "@/components/common/table";
import { TableShell } from "@/components/common/table-shell";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  label?: string;
  title?: string;
  actions?: React.ReactNode;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  footer?: React.ReactNode;
  searchAddon?: React.ReactNode;
  useUrlPagination?: boolean;
  pageSize?: number;
};

export function DataTable<TData>({
  columns,
  data,
  label,
  title,
  actions,
  enableSearch,
  searchPlaceholder = "Search...",
  footer,
  searchAddon,
  useUrlPagination = false,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    if (!enableSearch || !query) return data;
    const lower = query.toLowerCase();
    return data.filter((row: any) =>
      Object.values(row || {}).some((val) =>
        String(val ?? "")
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [data, enableSearch, query]);

  const currentPage = useMemo(() => {
    if (!useUrlPagination) return 1;
    const param = Number(searchParams.get("page")) || 1;
    return Math.max(1, param);
  }, [searchParams, useUrlPagination]);

  const paginatedData = useMemo(() => {
    if (!useUrlPagination) return filtered;
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [currentPage, filtered, pageSize, useUrlPagination]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );

  const effectiveFooter =
    useUrlPagination && filtered.length > 0 ? (
      <Pagination totalPages={totalPages} />
    ) : (
      footer
    );

  const hasData = table.getRowModel().rows.length > 0;

  return (
    <>
      <TableShell label={label} title={title} actions={actions}>
        {enableSearch && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-2">
            {searchAddon && (
              <div className="flex flex-wrap items-center gap-2">{searchAddon}</div>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("table.search", { defaultValue: searchPlaceholder })}
              className="w-full max-w-xs rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none"
            />
          </div>
        )}
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="text-left bg-[var(--surface-strong)] text-[var(--text-primary)]"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 text-sm font-semibold"
                    style={{
                      width: header.getSize()
                        ? `${header.getSize()}px`
                        : undefined,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-[var(--surface)] even:bg-[var(--surface-strong)]"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-[var(--border)] px-4 py-5 text-[var(--text-primary)]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {!hasData && (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-4 py-6 text-center text-sm text-[var(--text-muted)]"
                >
                  {t("table.noData", { defaultValue: "There is no data." })}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableShell>
      {effectiveFooter && hasData && (
        <div className="mt-2 flex justify-end">{effectiveFooter}</div>
      )}
    </>
  );
}
