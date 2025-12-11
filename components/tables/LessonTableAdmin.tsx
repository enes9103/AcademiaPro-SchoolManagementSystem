"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbLesson/btn/del";
import Edt from "@/components/TbLesson/btn/edt";
import Ad from "@/components/TbLesson/btn/ad";
import Pagination from "@/components/pagination/pagination";

type LessonRow = {
  id: string;
  name: string;
  cat: string;
  teacherName: string;
};

export function LessonTableAdmin({
  rows,
  totalPages,
  teachers,
}: {
  rows: LessonRow[];
  totalPages: number;
  teachers: any[];
}) {
  const columns: ColumnDef<LessonRow>[] = [
    { header: "Lesson", accessorKey: "name", size: 220 },
    { header: "Category", accessorKey: "cat", size: 150 },
    { header: "Teacher", accessorKey: "teacherName", size: 180 },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Del lesson={row.original as any} />
          <Edt teachers={teachers} lesson={row.original as any} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label="Manage"
      title="Lessons"
      actions={<Ad teachers={teachers} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
