import { notFound } from "next/navigation";
import { UserStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ClassroomStudentRow } from "@/components/reports/ClassroomStudentsTable";
import { ClassroomReportDetail } from "@/components/reports/ClassroomReportDetail";

const ClassroomReportDetailPage = async ({ params }: { params: { id: string } }) => {
  const classroom = await db.classrooms
    .findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        studentOnclassroom: {
          select: {
            student: {
              select: {
                id: true,
                name: true,
                user: {
                  select: {
                    email: true,
                    status: true,
                  },
                },
              },
            },
          },
        },
        schedule: {
          select: {
            lesson: {
              select: {
                teacher: {
                  select: {
                    name: true,
                    user: { select: { email: true } },
                  },
                },
              },
            },
          },
        },
      },
    })
    .finally(() => db.$disconnect());

  if (!classroom) {
    return notFound();
  }

  const teachers =
    classroom.schedule
      .map((s) => s.lesson.teacher)
      .filter(Boolean)
      .map((t) => ({
        name: t?.name ?? "",
        email: t?.user?.email ?? "",
      })) ?? [];

  // unique teacher by name+email
  const uniqueTeachers: { name: string; email: string }[] = [];
  const teacherKeys = new Set<string>();
  teachers.forEach((t) => {
    const key = `${t.name}-${t.email}`;
    if (!teacherKeys.has(key)) {
      teacherKeys.add(key);
      uniqueTeachers.push(t);
    }
  });

  const studentRows: ClassroomStudentRow[] =
    classroom.studentOnclassroom.map((entry) => ({
      id: entry.student.id,
      name: entry.student.name ?? "Bilinmiyor",
      email: entry.student.user?.email ?? "",
      status: entry.student.user?.status ?? UserStatus.UNKNOW,
    })) ?? [];

  return (
    <ClassroomReportDetail
      classroomName={classroom.name}
      teachers={uniqueTeachers}
      students={studentRows}
    />
  );
};

export default ClassroomReportDetailPage;
