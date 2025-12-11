"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { UserStatus } from "@prisma/client";
import { DataTable } from "@/components/common/data-table";
import { useTranslation } from "react-i18next";

export type ClassroomStudentRow = {
  id: string;
  name: string;
  email: string | null;
  status: UserStatus;
};

export const ClassroomStudentsTable = ({
  rows,
}: {
  rows: ClassroomStudentRow[];
}) => {
  const { t } = useTranslation();
  const columns: ColumnDef<ClassroomStudentRow>[] = [
    { header: t("reports.students.title"), accessorKey: "name" },
    { header: t("feedback.form.email"), accessorKey: "email" },
    { header: t("reports.common.status"), accessorKey: "status" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <Link
          href={`/admin/reports/students/${row.original.id}`}
          className="btnEdt inline-flex items-center justify-center text-sm"
        >
          {t("reports.common.detail")}
        </Link>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      label={t("reports.classroomDetail.students")}
      title={t("reports.classroomDetail.students")}
      enableSearch
      searchPlaceholder={t("reports.students.search")}
      useUrlPagination
      pageSize={10}
    />
  );
};
