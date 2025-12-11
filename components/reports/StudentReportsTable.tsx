"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { UserStatus } from "@prisma/client";
import { DataTable } from "../common/data-table";
import { useTranslation } from "react-i18next";

type StudentReportRow = {
  id: string;
  name: string;
  email: string | null;
  status: UserStatus;
  classrooms: string[];
};

const statusFilters: { value: "all" | UserStatus; label: string }[] = [
  { value: "all", label: "all" },
  { value: UserStatus.ACTIVE, label: "active" },
  { value: UserStatus.IN_ACTIVE, label: "inactive" },
  { value: UserStatus.BANNED, label: "banned" },
  { value: UserStatus.UNKNOW, label: "unknown" },
];

export function StudentReportsTable({ rows }: { rows: StudentReportRow[] }) {
  const [status, setStatus] = useState<"all" | UserStatus>("all");
  const { t } = useTranslation();

  const filteredRows = useMemo(() => {
    if (status === "all") return rows;
    return rows.filter((row) => row.status === status);
  }, [rows, status]);

  const columns: ColumnDef<StudentReportRow>[] = [
    { header: t("reports.students.title"), accessorKey: "name" },
    { header: t("feedback.form.email"), accessorKey: "email" },
    { header: t("reports.common.status"), accessorKey: "status" },
    {
      header: "Sınıflar",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 text-sm text-[var(--text-primary)]">
          {row.original.classrooms.length > 0
            ? row.original.classrooms.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs text-[var(--accent)]"
                >
                  {name}
                </span>
              ))
            : "—"}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/students/${row.original.id}`}
          className="btnEdt inline-flex items-center justify-center text-sm"
        >
          {t("reports.common.detail")}
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredRows}
      label={t("reports.students.label")}
      title={t("reports.students.title")}
      enableSearch
      searchPlaceholder={t("reports.students.search")}
      searchAddon={
        <>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {t("reports.common.status")}
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
                {opt.value === "all"
                  ? t("reports.classrooms.filters.all")
                  : opt.label}
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
