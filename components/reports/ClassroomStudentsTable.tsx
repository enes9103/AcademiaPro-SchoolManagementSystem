"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { UserStatus } from "@prisma/client";
import { DataTable } from "@/components/common/data-table";

export type ClassroomStudentRow = {
  id: string;
  name: string;
  email: string | null;
  status: UserStatus;
};

export const ClassroomStudentsTable = ({
  rows,
}: {
  rows: ClassroomStudentRow[];
}) => {
  const columns: ColumnDef<ClassroomStudentRow>[] = [
    { header: "Öğrenci", accessorKey: "name" },
    { header: "E-posta", accessorKey: "email" },
    { header: "Durum", accessorKey: "status" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/students/${row.original.id}`}
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
      data={rows}
      label="Reports"
      title="Öğrenciler"
      enableSearch
      searchPlaceholder="Öğrenci ara..."
      useUrlPagination
      pageSize={10}
    />
  );
};
