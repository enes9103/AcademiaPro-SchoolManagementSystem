import React from "react";

import { getAllLessons, getAllClassrooms } from "@/data/academy";
import { fetchAssignment } from "@/data/assignments";
import { PageProps } from "@/types/pagination";
import { AssignmentTableAdmin } from "@/components/tables/AssignmentTableAdmin";
const AssignmentList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchAssignment({ take, skip });
  const [lessons, classrooms] = await Promise.all([
    getAllLessons(),
    getAllClassrooms(),
  ]);

  const rows = data.map((item) => ({
    ...item,
    lessonName: item.lesson.name,
    teacherName: item.teacher.name,
    classroomName: item.classroom.name,
    deadlineLabel: item.deadline.toLocaleDateString(),
  }));

  return (
    <AssignmentTableAdmin
      rows={rows as any}
      totalPages={metadata.totalPages}
      lessons={lessons}
      classrooms={classrooms}
    />
  );
};

export default AssignmentList;
