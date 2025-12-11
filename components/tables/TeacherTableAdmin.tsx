"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";
import { useTranslation } from "react-i18next";

type TeacherRow = {
  id: string;
  name: string;
  email: string;
  gender: string;
  status: string;
};

export function TeacherTableAdmin({
  rows,
  totalPages,
}: {
  rows: TeacherRow[];
  totalPages: number;
}) {
  const { t } = useTranslation();
  const columns: ColumnDef<TeacherRow>[] = [
    { header: t("manage.users.columns.name"), accessorKey: "name", size: 200 },
    { header: t("manage.users.columns.email"), accessorKey: "email", size: 220 },
    { header: t("manage.users.columns.gender"), accessorKey: "gender", size: 120 },
    { header: t("manage.users.columns.status"), accessorKey: "status", size: 150 },
  ];

  return (
    <DataTable
      label={t("manage.label")}
      title={t("manage.teachers.title")}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
