import React from "react";
import { getAllTeachers } from "@/data/academy";
import { fetchLessons } from "@/data/lessons";
import { PageProps } from "@/types/pagination";
import { LessonTableAdmin } from "@/components/tables/LessonTableAdmin";

const UserList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchLessons({ take, skip });
  const [teachers] = await Promise.all([getAllTeachers()]);

  const rows = data.map((item) => ({
    ...item,
    teacherName: item.teacher.name,
  }));

  return (
    <LessonTableAdmin
      rows={rows as any}
      totalPages={metadata.totalPages}
      teachers={teachers}
    />
  );
};

export default UserList;
