"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";
import { DataTable } from "../common/data-table";

type ClassroomReportRow = {
  id: string;
  name: string;
  cap: number;
  students: number;
};

const capacityFilters = [
  { value: "all", label: "Tümü" },
  { value: "lt20", label: "< 20" },
  { value: "20-30", label: "20 - 30" },
  { value: "gt30", label: "> 30" },
];

export function ClassroomReportsTable({ rows }: { rows: ClassroomReportRow[] }) {
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
    { header: "Sınıf", accessorKey: "name" },
    { header: "Kapasite", accessorKey: "cap" },
    { header: "Öğrenci Sayısı", accessorKey: "students" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/classrooms/${row.original.id}`}
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
      title="Classroom Reports"
      enableSearch
      searchPlaceholder="Sınıf ara..."
      searchAddon={
        <>
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Kapasite:
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
                {opt.label}
              </button>
            ))}
          </div>
        </>
      }
    />
  );
}
