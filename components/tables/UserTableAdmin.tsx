"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import Pagination from "@/components/pagination/pagination";
import Ad from "@/components/TbUser/btn/ad";
import Del from "@/components/TbUser/btn/del";
import Edt from "@/components/TbUser/btn/edt";

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
  const columns: ColumnDef<UserRow>[] = [
    { header: "Name", accessorKey: "name", size: 220 },
    { header: "Email", accessorKey: "email", size: 220 },
    { header: "Role", accessorKey: "role", size: 150 },
    { header: "Status", accessorKey: "status", size: 150 },
    {
      header: "Actions",
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
      label="Users"
      title="User List"
      actions={<Ad />}
      columns={columns}
      data={rows}
      footer={<Pagination totalPages={totalPages} />}
      enableSearch
    />
  );
}
