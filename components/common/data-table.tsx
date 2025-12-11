"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Table } from "@/components/common/table";
import { TableShell } from "@/components/common/table-shell";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  label?: string;
  title?: string;
  actions?: React.ReactNode;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  footer?: React.ReactNode;
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
}: DataTableProps<TData>) {
  const [query, setQuery] = useState("");

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

  const table = useReactTable({
    data: filtered,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const hasData = table.getRowModel().rows.length > 0;

  return (
    <>
      <TableShell label={label} title={title} actions={actions}>
        {enableSearch && (
          <div className="flex items-center justify-end border-b border-[var(--border)] px-4 py-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
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
                  There is no data.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableShell>
      {footer && hasData && (
        <div className="mt-2 flex justify-end">{footer}</div>
      )}
    </>
  );
}
