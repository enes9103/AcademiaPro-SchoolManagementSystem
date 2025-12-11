"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbSchedule/btn/del";
import Edt from "@/components/TbSchedule/btn/edt";
import Ad from "@/components/TbSchedule/btn/ad";
import Pagination from "@/components/pagination/pagination";

type ScheduleRow = {
  id: string;
  lessonName: string;
  classroomName: string;
  teacherName: string;
  dayLabel: string;
  time: string;
};

export function ScheduleTableAdmin({
  rows,
  totalPages,
  lessons,
  classrooms,
}: {
  rows: ScheduleRow[];
  totalPages: number;
  lessons: any[];
  classrooms: any[];
}) {
  const columns: ColumnDef<ScheduleRow>[] = [
    { header: "Lesson", accessorKey: "lessonName", size: 200 },
    { header: "Classroom", accessorKey: "classroomName", size: 180 },
    { header: "Teacher", accessorKey: "teacherName", size: 180 },
    { header: "Day", accessorKey: "dayLabel", size: 150 },
    { header: "Time", accessorKey: "time", size: 120 },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Del schedule={row.original as any} />
          <Edt
            lessons={lessons}
            classrooms={classrooms}
            schedule={row.original as any}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label="Manage"
      title="Schedule"
      actions={<Ad lessons={lessons} classrooms={classrooms} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
