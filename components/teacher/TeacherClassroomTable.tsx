"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";

export type TeacherClassroomRow = {
  id: string;
  name: string;
  cap: string;
  students: { name: string; email: string | null }[];
};

export const TeacherClassroomTable = ({ rows }: { rows: TeacherClassroomRow[] }) => {
  const columns: ColumnDef<TeacherClassroomRow>[] = [
    { header: "Sınıf", accessorKey: "name" },
    { header: "Kapasite", accessorKey: "cap" },
    {
      header: "Öğrenciler",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2 text-sm text-[var(--text-primary)]">
          {row.original.students.length > 0 ? (
            row.original.students.map((s, idx) => (
              <span
                key={`${row.original.id}-${idx}`}
                className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]"
              >
                {s.name}
                {s.email ? ` • ${s.email}` : ""}
              </span>
            ))
          ) : (
            <span className="text-[var(--text-muted)]">Öğrenci yok</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      label="Teacher"
      title="Classrooms"
      enableSearch
      searchPlaceholder="Sınıf ara..."
      useUrlPagination
      pageSize={10}
    />
  );
};
