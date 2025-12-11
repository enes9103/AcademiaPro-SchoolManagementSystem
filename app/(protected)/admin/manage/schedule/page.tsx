import React from "react";
import Ad from "@/components/TbSchedule/btn/ad";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import { PageProps } from "@/types/pagination";
import { fetchSchedules } from "@/data/schedules";
import { ScheduleTableAdmin } from "@/components/tables/ScheduleTableAdmin";
const ScheduleList = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchSchedules({ take, skip });
  const [lessons, classrooms] = await Promise.all([
    getAllLessons(),
    getAllClassrooms(),
  ]);

  const rows = data.map((item) => ({
    ...item,
    lessonName: item.lesson.name,
    classroomName: item.classroom.name,
    teacherName: item.lesson.teacher.name,
    dayLabel: item.day.toLocaleDateString(),
  }));

  return (
    <ScheduleTableAdmin
      rows={rows as any}
      totalPages={metadata.totalPages}
      lessons={lessons}
      classrooms={classrooms}
    />
  );
};

export default ScheduleList;
