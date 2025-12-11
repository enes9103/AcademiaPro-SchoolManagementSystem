import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { TeacherScheduleTable, TeacherScheduleRow } from "@/components/teacher/TeacherScheduleTable";

const Schedulelist = async () => {
  const teacher = await getSchedulebyTeacherId();

  const rows: TeacherScheduleRow[] =
    teacher?.lesson.flatMap((lesson) =>
      lesson.schedule.map((sch) => ({
        lesson: lesson.name,
        classroom: sch.classroom.name,
        date: new Date(sch.day).toLocaleDateString("tr-TR"),
        time: sch.time,
      }))
    ) ?? [];

  return <TeacherScheduleTable rows={rows} />;
};

export default Schedulelist;
