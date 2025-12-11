"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";

type TeacherRow = {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export function TeacherTableAdmin({
  rows,
  totalPages,
}: {
  rows: TeacherRow[];
  totalPages: number;
}) {
  const columns: ColumnDef<TeacherRow>[] = [
    { header: "Name", accessorKey: "name", size: 200 },
    { header: "Email", accessorKey: "email", size: 220 },
    { header: "Gender", accessorKey: "gender", size: 120 },
    { header: "Status", accessorKey: "status", size: 150 },
  ];

  return (
    <DataTable
      label="Users"
      title="Teacher List"
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
