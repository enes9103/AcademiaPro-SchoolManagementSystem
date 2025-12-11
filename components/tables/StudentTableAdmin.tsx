"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";
import Add from "@/components/TbStudent/btn/add";

type StudentRow = {
  id: string;
  name: string;
  email: string;
  classrooms: string;
  status: string;
  raw: any;
  classroomsList: any[];
};

export function StudentTableAdmin({
  rows,
  totalPages,
  classrooms,
}: {
  rows: StudentRow[];
  totalPages: number;
  classrooms: any[];
}) {
  const columns: ColumnDef<StudentRow>[] = [
    { header: "Name", accessorKey: "name", size: 200 },
    { header: "Email", accessorKey: "email", size: 220 },
    { header: "Classroom", accessorKey: "classrooms", size: 200 },
    { header: "Status", accessorKey: "status", size: 150 },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Add classrooms={classrooms} student={row.original.raw} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label="Users"
      title="Student List"
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
