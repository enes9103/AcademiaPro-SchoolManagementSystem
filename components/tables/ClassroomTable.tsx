"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbClassroom/btn/del";
import Edt from "@/components/TbClassroom/btn/edt";
import Ad from "@/components/TbClassroom/btn/ad";
import Pagination from "@/components/pagination/pagination";

type ClassroomRow = {
  id: string;
  name: string;
  cap: string;
  totalStudents: number;
};

export function ClassroomTable({
  rows,
  totalPages,
}: {
  rows: ClassroomRow[];
  totalPages: number;
}) {
  const columns: ColumnDef<ClassroomRow>[] = [
    { header: "Classroom", accessorKey: "name", size: 220 },
    { header: "Capacity", accessorKey: "cap", size: 150 },
    { header: "Total Student", accessorKey: "totalStudents", size: 150 },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Del classroom={row.original} />
          <Edt classroom={row.original} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label="Manage"
      title="Classrooms"
      actions={<Ad />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
