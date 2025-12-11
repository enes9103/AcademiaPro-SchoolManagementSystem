import React from "react";
import { PageProps } from "@/types/pagination";
import { fetchUsers } from "@/data/users";
import { UserTableAdmin } from "@/components/tables/UserTableAdmin";

const UserList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  const { data, metadata } = await fetchUsers({ take, skip, query: search });

  const rows = data.map((user) => ({
    ...user,
    role: user.role,
    status: user.status.replace(/_/g, " "),
  }));

  return (
    <UserTableAdmin rows={rows as any} totalPages={metadata.totalPages} />
  );
};

export default UserList;
