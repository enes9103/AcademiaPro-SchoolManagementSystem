import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { TeacherScheduleRow } from "@/components/reports/TeacherScheduleTable";
import { TeacherReportDetail } from "@/components/reports/TeacherReportDetail";

const TeacherReportDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const teacher = await db.teachers
    .findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        user: { select: { email: true } },
        lesson: {
          select: {
            id: true,
            name: true,
            schedule: {
              select: {
                id: true,
                day: true,
                time: true,
                classroom: {
                  select: {
                    id: true,
                    name: true,
                    cap: true,
                    studentOnclassroom: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .finally(() => db.$disconnect());

  if (!teacher) return notFound();

  const rows: TeacherScheduleRow[] = [];

  teacher.lesson.forEach((lesson) => {
    lesson.schedule.forEach((schedule) => {
      rows.push({
        id: schedule.id,
        className: schedule.classroom.name,
        lessonName: lesson.name,
        date: schedule.day.toISOString(),
        time: schedule.time,
        students: schedule.classroom.studentOnclassroom.length,
        capacity: Number(schedule.classroom.cap),
      });
    });
  });

  return (
    <TeacherReportDetail teacherName={teacher.name} email={teacher.user?.email} rows={rows} />
  );
};

export default TeacherReportDetailPage;
