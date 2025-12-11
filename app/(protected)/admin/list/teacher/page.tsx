import React from "react";
import { PageProps } from "@/types/pagination";
import { fetchTeachers } from "@/data/teachers";
import { TeacherTableAdmin } from "@/components/tables/TeacherTableAdmin";

const TeacherList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchTeachers({ take, skip });

  const rows = data.map((teacher) => ({
    id: teacher.id,
    name: teacher.name,
    email: teacher.user.email,
    gender: teacher.user.gender,
    status: teacher.user.status.replace(/_/g, " "),
  }));

  return (
    <TeacherTableAdmin rows={rows} totalPages={metadata.totalPages} />
  );
};

export default TeacherList;
