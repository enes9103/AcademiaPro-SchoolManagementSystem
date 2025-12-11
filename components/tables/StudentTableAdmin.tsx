"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";
import Add from "@/components/TbStudent/btn/add";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const columns: ColumnDef<StudentRow>[] = [
    { header: t("manage.users.columns.name"), accessorKey: "name", size: 200 },
    { header: t("manage.users.columns.email"), accessorKey: "email", size: 220 },
    { header: t("manage.users.columns.classroom"), accessorKey: "classrooms", size: 200 },
    { header: t("manage.users.columns.status"), accessorKey: "status", size: 150 },
    {
      header: t("manage.users.columns.actions"),
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Add classrooms={classrooms} student={row.original.raw} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label={t("manage.label")}
      title={t("manage.students.title")}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
