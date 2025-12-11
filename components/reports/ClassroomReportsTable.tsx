"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "../common/data-table";
import { useTranslation } from "react-i18next";

type ClassroomReportRow = {
  id: string;
  name: string;
  cap: number;
  students: number;
};

const capacityFilters = [
  { value: "all", label: "all" },
  { value: "lt20", label: "lt20" },
  { value: "20-30", label: "20-30" },
  { value: "gt30", label: "gt30" },
];

export function ClassroomReportsTable({ rows }: { rows: ClassroomReportRow[] }) {
  const { t } = useTranslation();
  const [capacity, setCapacity] = useState<string>("all");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      if (capacity === "lt20") return row.cap < 20;
      if (capacity === "20-30") return row.cap >= 20 && row.cap <= 30;
      if (capacity === "gt30") return row.cap > 30;
      return true;
    });
  }, [capacity, rows]);

  const columns: ColumnDef<ClassroomReportRow>[] = [
    { header: t("dashboard.cards.classrooms"), accessorKey: "name" },
    { header: t("reports.common.capacity"), accessorKey: "cap" },
    { header: t("reports.students.title"), accessorKey: "students" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/classrooms/${row.original.id}`}
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
      label={t("reports.classrooms.label")}
      title={t("reports.classrooms.title")}
      enableSearch
      searchPlaceholder={t("reports.classrooms.search")}
      searchAddon={
        <>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            {t("reports.common.capacity")}
          </span>
          <div className="flex flex-wrap gap-2">
            {capacityFilters.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setCapacity(opt.value)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  capacity === opt.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                }`}
              >
                {t(`reports.classrooms.filters.${opt.value}`)}
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
