"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Del from "@/components/TbClassroom/btn/del";
import Edt from "@/components/TbClassroom/btn/edt";
import Ad from "@/components/TbClassroom/btn/ad";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const columns: ColumnDef<ClassroomRow>[] = [
    { header: t("manage.users.columns.classroom"), accessorKey: "name", size: 220 },
    { header: t("manage.users.columns.capacity"), accessorKey: "cap", size: 150 },
    { header: t("manage.users.columns.totalStudents"), accessorKey: "totalStudents", size: 150 },
    {
      header: t("manage.users.columns.actions"),
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
      label={t("manage.label")}
      title={t("manage.classrooms.title")}
      actions={<Ad />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
    />
  );
}
