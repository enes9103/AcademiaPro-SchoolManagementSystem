import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { StudentDetailRow } from "@/components/reports/StudentDetailTable";
import { StudentReportDetail } from "@/components/reports/StudentReportDetail";

const StudentReportDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const student = await db.students
    .findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        user: {
          select: {
            email: true,
            status: true,
          },
        },
        onClassroom: {
          select: {
            classroom: {
              select: {
                id: true,
                name: true,
                schedule: {
                  select: {
                    day: true,
                    time: true,
                    lesson: {
                      select: {
                        name: true,
                        teacher: {
                          select: {
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .finally(() => db.$disconnect());

  if (!student) return notFound();

  const rows: StudentDetailRow[] = [];

  student.onClassroom.forEach((c) => {
    const schedules = c.classroom.schedule;
    if (!schedules.length) {
      rows.push({
        id: c.classroom.id,
        className: c.classroom.name,
        lessonName: "—",
        teacherName: "—",
        scheduleDate: "—",
        scheduleTime: "—",
      });
    } else {
      schedules.forEach((sch) => {
        rows.push({
          id: `${c.classroom.id}-${sch.day.toISOString()}-${sch.time}`,
          className: c.classroom.name,
          lessonName: sch.lesson.name,
          teacherName: sch.lesson.teacher?.name ?? "—",
          scheduleDate: new Date(sch.day).toLocaleDateString("tr-TR"),
          scheduleTime: sch.time,
        });
      });
    }
  });

  return (
    <StudentReportDetail
      name={student.name}
      email={student.user?.email}
      status={student.user?.status}
      rows={rows}
    />
  );
};

export default StudentReportDetailPage;
