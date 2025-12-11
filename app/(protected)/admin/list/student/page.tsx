import React from "react";
import { PageProps } from "@/types/pagination";
import { fetchStudents } from "@/data/students";
import { getAllClassrooms } from "@/data/academy";
import { StudentTableAdmin } from "@/components/tables/StudentTableAdmin";

const UserList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const { data, metadata } = await fetchStudents({ take, skip });

  const rows = data.map((student) => ({
    id: student.id,
    name: student.name,
    email: student.user.email,
    classrooms:
      student.onClassroom.length > 0
        ? student.onClassroom.map((oc) => oc.classroom.name).join(", ")
        : "No data",
    status: student.user.status.replace(/_/g, " "),
    raw: student,
    classroomsList: classrooms,
  }));

  return (
    <StudentTableAdmin
      rows={rows}
      totalPages={metadata.totalPages}
      classrooms={classrooms}
    />
  );
};

export default UserList;
