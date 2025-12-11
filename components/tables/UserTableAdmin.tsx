"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";
import Ad from "@/components/TbUser/btn/ad";
import Del from "@/components/TbUser/btn/del";
import Edt from "@/components/TbUser/btn/edt";
import { useTranslation } from "react-i18next";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

export function UserTableAdmin({
  rows,
  totalPages,
}: {
  rows: UserRow[];
  totalPages: number;
}) {
  const { t } = useTranslation();
  const columns: ColumnDef<UserRow>[] = [
    { header: t("manage.users.columns.name"), accessorKey: "name", size: 220 },
    { header: t("manage.users.columns.email"), accessorKey: "email", size: 220 },
    { header: t("manage.users.columns.role"), accessorKey: "role", size: 150 },
    { header: t("manage.users.columns.status"), accessorKey: "status", size: 150 },
    {
      header: t("manage.users.columns.actions"),
      cell: ({ row }) => (
        <div className="flex items-center space-x-3.5">
          <Del user={row.original as any} />
          <Edt user={row.original as any} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      label={t("manage.label")}
      title={t("manage.users.title")}
      actions={<Ad />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
