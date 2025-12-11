"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "../common/data-table";
import { UserStatus } from "@prisma/client";
import { useTranslation } from "react-i18next";

type TeacherReportRow = {
  id: string;
  name: string;
  email: string | null;
  gender: string | null;
  status: UserStatus;
  lessons: number;
};

const statusFilters: { value: "all" | UserStatus; label: string }[] = [
  { value: "all", label: "all" },
  { value: UserStatus.ACTIVE, label: "active" },
  { value: UserStatus.IN_ACTIVE, label: "inactive" },
  { value: UserStatus.BANNED, label: "banned" },
  { value: UserStatus.UNKNOW, label: "unknown" },
];

export function TeacherReportsTable({ rows }: { rows: TeacherReportRow[] }) {
  const [status, setStatus] = useState<"all" | UserStatus>("all");
  const { t } = useTranslation();

  const filteredRows = useMemo(() => {
    if (status === "all") return rows;
    return rows.filter((row) => row.status === status);
  }, [rows, status]);

  const columns: ColumnDef<TeacherReportRow>[] = [
    { header: t("dashboard.cards.users"), accessorKey: "name" },
    { header: t("feedback.form.email"), accessorKey: "email" },
    { header: "Gender", accessorKey: "gender" },
    { header: t("reports.common.status"), accessorKey: "status" },
    { header: t("dashboard.cards.lessons"), accessorKey: "lessons" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/teachers/${row.original.id}`}
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
      label={t("reports.teachers.label")}
      title={t("reports.teachers.title")}
      enableSearch
      searchPlaceholder={t("reports.teachers.search")}
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
