"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbAssignment/btn/del";
import Edt from "@/components/TbAssignment/btn/edt";
import Ad from "@/components/TbAssignment/btn/ad";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const columns: ColumnDef<AssignmentRow>[] = [
    { header: t("manage.users.columns.lesson"), accessorKey: "lessonName", size: 220 },
    { header: t("manage.users.columns.task"), accessorKey: "task", size: 150 },
    { header: t("manage.users.columns.createdBy"), accessorKey: "teacherName", size: 150 },
    { header: t("manage.users.columns.classroom"), accessorKey: "classroomName", size: 150 },
    {
      header: t("manage.users.columns.file"),
      cell: ({ row }) =>
        row.original.fileUrl ? (
          <a
            className="text-[var(--accent)] underline"
            href={row.original.fileUrl}
            target="_blank"
            rel="noreferrer"
          >
            {t("manage.users.columns.link")}
          </a>
        ) : (
          <span className="text-[var(--text-muted)]">
            {t("manage.users.columns.nofile")}
          </span>
        ),
    },
    { header: t("manage.users.columns.deadline"), accessorKey: "deadlineLabel", size: 150 },
    { header: t("manage.users.columns.time"), accessorKey: "time", size: 150 },
    {
      header: t("manage.users.columns.actions"),
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
      label={t("manage.label")}
      title={t("manage.assignments.title")}
      actions={<Ad lessons={lessons} classrooms={classrooms} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
