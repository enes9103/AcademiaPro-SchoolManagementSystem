"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";

export type StudentDetailRow = {
  id: string;
  className: string;
  lessonName: string;
  teacherName: string;
  scheduleDate: string | null;
  scheduleTime: string | null;
};

const columns: ColumnDef<StudentDetailRow>[] = [
  { header: "Sınıf", accessorKey: "className" },
  { header: "Ders", accessorKey: "lessonName" },
  { header: "Öğretmen", accessorKey: "teacherName" },
  { header: "Tarih", accessorKey: "scheduleDate" },
  { header: "Saat", accessorKey: "scheduleTime" },
];

export const StudentDetailTable = ({ rows }: { rows: StudentDetailRow[] }) => {
  return (
    <DataTable
      columns={columns}
      data={rows}
      label="Reports"
      title="Sınıf / Ders Kayıtları"
      enableSearch
      searchPlaceholder="Sınıf veya ders ara..."
      useUrlPagination
      pageSize={10}
    />
  );
};
