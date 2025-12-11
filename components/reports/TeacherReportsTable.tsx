"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "../common/data-table";
import { UserStatus } from "@prisma/client";

type TeacherReportRow = {
  id: string;
  name: string;
  email: string | null;
  gender: string | null;
  status: UserStatus;
  lessons: number;
};

const statusFilters: { value: "all" | UserStatus; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: UserStatus.ACTIVE, label: "Active" },
  { value: UserStatus.IN_ACTIVE, label: "Inactive" },
  { value: UserStatus.BANNED, label: "Banned" },
  { value: UserStatus.UNKNOW, label: "Unknown" },
];

export function TeacherReportsTable({ rows }: { rows: TeacherReportRow[] }) {
  const [status, setStatus] = useState<"all" | UserStatus>("all");

  const filteredRows = useMemo(() => {
    if (status === "all") return rows;
    return rows.filter((row) => row.status === status);
  }, [rows, status]);

  const columns: ColumnDef<TeacherReportRow>[] = [
    { header: "Öğretmen", accessorKey: "name" },
    { header: "E-posta", accessorKey: "email" },
    { header: "Cinsiyet", accessorKey: "gender" },
    { header: "Durum", accessorKey: "status" },
    { header: "Ders Sayısı", accessorKey: "lessons" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/teachers/${row.original.id}`}
          className="btnSave inline-flex items-center justify-center px-3 py-1 text-sm"
        >
          Detail
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredRows}
      label="Reports"
      title="Teacher Reports"
      enableSearch
      searchPlaceholder="Öğretmen ara..."
      searchAddon={
        <>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Durum:
          </span>
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  status === opt.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      }
      useUrlPagination
      pageSize={10}
    />
  );
}
