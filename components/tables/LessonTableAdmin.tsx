"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbLesson/btn/del";
import Edt from "@/components/TbLesson/btn/edt";
import Ad from "@/components/TbLesson/btn/ad";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const columns: ColumnDef<LessonRow>[] = [
    { header: t("manage.users.columns.lesson"), accessorKey: "name", size: 220 },
    { header: t("manage.users.columns.category"), accessorKey: "cat", size: 150 },
    { header: t("manage.users.columns.teacher"), accessorKey: "teacherName", size: 180 },
    {
      header: t("manage.users.columns.actions"),
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
      label={t("manage.label")}
      title={t("manage.lessons.title")}
      actions={<Ad teachers={teachers} />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
