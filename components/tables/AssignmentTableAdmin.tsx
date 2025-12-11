"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbAssignment/btn/del";
import Edt from "@/components/TbAssignment/btn/edt";
import Ad from "@/components/TbAssignment/btn/ad";
import Pagination from "@/components/pagination/pagination";

type AssignmentRow = {
  id: string;
  lessonName: string;
  task: string;
  teacherName: string;
  classroomName: string;
  fileUrl?: string | null;
  deadlineLabel: string;
  time: string;
};

export function AssignmentTableAdmin({
  rows,
  totalPages,
  lessons,
  classrooms,
}: {
  rows: AssignmentRow[];
  totalPages: number;
  lessons: any[];
  classrooms: any[];
}) {
  const columns: ColumnDef<AssignmentRow>[] = [
    { header: "Lesson", accessorKey: "lessonName", size: 220 },
    { header: "Name", accessorKey: "task", size: 150 },
    { header: "CreateBy", accessorKey: "teacherName", size: 150 },
    { header: "Classroom", accessorKey: "classroomName", size: 150 },
    {
      header: "File",
      cell: ({ row }) =>
        row.original.fileUrl ? (
          <a
            className="text-[var(--accent)] underline"
            href={row.original.fileUrl}
            target="_blank"
            rel="noreferrer"
          >
            Link
          </a>
        ) : (
          <span className="text-[var(--text-muted)]">No file</span>
        ),
    },
    { header: "Deadline", accessorKey: "deadlineLabel", size: 150 },
    { header: "Time", accessorKey: "time", size: 150 },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Del assignment={row.original as any} />
          <Edt
            lessons={lessons}
            classrooms={classrooms}
            assignment={row.original as any}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label="Manage"
      title="Assignments"
      actions={<Ad lessons={lessons} classrooms={classrooms} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
