"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";

export type TeacherScheduleRow = {
  lesson: string;
  classroom: string;
  date: string;
  time: string;
};

export const TeacherScheduleTable = ({
  rows,
}: {
  rows: TeacherScheduleRow[];
}) => {
  const columns: ColumnDef<TeacherScheduleRow>[] = [
    { header: "Ders", accessorKey: "lesson" },
    { header: "Sınıf", accessorKey: "classroom" },
    { header: "Tarih", accessorKey: "date" },
    { header: "Saat", accessorKey: "time" },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      label="Teacher"
      title="Schedule"
      enableSearch
      searchPlaceholder="Ders veya sınıf ara..."
      useUrlPagination
      pageSize={10}
    />
  );
};
