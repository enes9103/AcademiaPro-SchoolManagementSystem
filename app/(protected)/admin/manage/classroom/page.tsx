import React from "react";
import { getTotalUsersInClassroom, fetchClassrooms } from "@/data/classrooms";
import { PageProps } from "@/types/pagination";
import { ClassroomTable } from "@/components/tables/ClassroomTable";

const ClassroomList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchClassrooms({ take, skip });
  const counts = await Promise.all(
    data.map(async (classroom) => {
      const count = await getTotalUsersInClassroom({ classroomId: classroom.id });
      return count;
    })
  );

  const rows = data.map((classroom, idx) => ({
    ...classroom,
    totalStudents: counts[idx],
  }));

  return (
    <ClassroomTable rows={rows} totalPages={metadata.totalPages} />
  );
};

export default ClassroomList;
