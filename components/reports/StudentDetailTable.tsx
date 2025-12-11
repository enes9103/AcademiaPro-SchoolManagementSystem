"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { useTranslation } from "react-i18next";

export type StudentDetailRow = {
  id: string;
  className: string;
  lessonName: string;
  teacherName: string;
  scheduleDate: string | null;
  scheduleTime: string | null;
};

export const StudentDetailTable = ({ rows }: { rows: StudentDetailRow[] }) => {
  const { t } = useTranslation();
  const columns: ColumnDef<StudentDetailRow>[] = [
    { header: t("reports.studentDetail.headers.class"), accessorKey: "className" },
    { header: t("reports.studentDetail.headers.lesson"), accessorKey: "lessonName" },
    { header: t("reports.studentDetail.headers.teacher"), accessorKey: "teacherName" },
    { header: t("reports.studentDetail.headers.date"), accessorKey: "scheduleDate" },
    { header: t("reports.studentDetail.headers.time"), accessorKey: "scheduleTime" },
  ];
  return (
    <DataTable
      columns={columns}
      data={rows}
      label={t("reports.students.label")}
      title={t("reports.studentDetail.title")}
      enableSearch
      searchPlaceholder={t("reports.studentDetail.search")}
      useUrlPagination
      pageSize={10}
    />
  );
};
