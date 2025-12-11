"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export type TeacherScheduleRow = {
  id: string;
  className: string;
  lessonName: string;
  date: string; // ISO string
  time: string;
  students: number;
  capacity?: number | null;
};

type Preset = "all" | "today" | "week" | "month" | "year";

export function TeacherScheduleTable({ rows }: { rows: TeacherScheduleRow[] }) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [preset, setPreset] = useState<Preset>("all");
  const { t } = useTranslation();

  const columns: ColumnDef<TeacherScheduleRow>[] = [
    { header: t("reports.teacherDetail.headers.lesson"), accessorKey: "lessonName" },
    { header: t("reports.teacherDetail.headers.classroom"), accessorKey: "className" },
    {
      header: t("reports.teacherDetail.headers.date"),
      cell: ({ row }) => format(new Date(row.original.date), "dd.MM.yyyy"),
    },
    { header: t("reports.teacherDetail.headers.time"), accessorKey: "time" },
    { header: t("reports.teacherDetail.headers.students"), accessorKey: "students" },
    {
      header: t("reports.teacherDetail.headers.capacity"),
      cell: ({ row }) => (row.original.capacity ? row.original.capacity : "—"),
    },
  ];

  const filteredRows = useMemo(() => {
    let from = startDate ? new Date(startDate) : null;
    let to = endDate ? new Date(endDate) : null;

    if (preset !== "all") {
      const now = new Date();
      if (preset === "today") {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        to = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      }
      if (preset === "week") {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // monday start
        from = new Date(now.setDate(diff));
        from.setHours(0, 0, 0, 0);
        to = new Date(from);
        to.setDate(from.getDate() + 7);
      }
      if (preset === "month") {
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        to = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      }
      if (preset === "year") {
        from = new Date(now.getFullYear(), 0, 1);
        to = new Date(now.getFullYear() + 1, 0, 1);
      }
    }

    return rows.filter((row) => {
      const d = new Date(row.date);
      if (from && d < from) return false;
      if (to && d >= to) return false;
      return true;
    });
  }, [endDate, preset, rows, startDate]);

  const presetButtons: { label: string; value: Preset }[] = [
    { label: t("reports.classrooms.filters.all"), value: "all" },
    { label: t("reports.teacherDetail.headers.date") + " - Today", value: "today" },
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <DataTable
      columns={columns}
      data={filteredRows}
      label="Reports"
      title="Ders Programı"
      enableSearch
      searchPlaceholder="Ders veya sınıf ara..."
      useUrlPagination
      pageSize={10}
      searchAddon={
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPreset("all");
              }}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-sm text-[var(--text-primary)]"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPreset("all");
              }}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-1 text-sm text-[var(--text-primary)]"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {presetButtons.map((btn) => (
              <button
                key={btn.value}
                type="button"
                onClick={() => {
                  setPreset(btn.value);
                  setStartDate("");
                  setEndDate("");
                }}
                className={`rounded-full border px-3 py-1 text-sm ${
                  preset === btn.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)]"
                    : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      }
    />
  );
}
