"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbSchedule/btn/del";
import Edt from "@/components/TbSchedule/btn/edt";
import Ad from "@/components/TbSchedule/btn/ad";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const columns: ColumnDef<ScheduleRow>[] = [
    { header: t("manage.users.columns.lesson"), accessorKey: "lessonName", size: 200 },
    { header: t("manage.users.columns.classroom"), accessorKey: "classroomName", size: 180 },
    { header: t("manage.users.columns.teacher"), accessorKey: "teacherName", size: 180 },
    { header: t("manage.users.columns.day"), accessorKey: "dayLabel", size: 150 },
    { header: t("manage.users.columns.time"), accessorKey: "time", size: 120 },
    {
      header: t("manage.users.columns.actions"),
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
      label={t("manage.label")}
      title={t("manage.schedule.title")}
      actions={<Ad lessons={lessons} classrooms={classrooms} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
