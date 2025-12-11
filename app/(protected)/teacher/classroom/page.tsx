import { auth } from "@/auth";
import { db } from "@/lib/db";
import {
  TeacherClassroomRow,
  TeacherClassroomTable,
} from "@/components/teacher/TeacherClassroomTable";

const TeacherClassroomPage = async () => {
  const session = await auth();

  const classrooms =
    (await db.classrooms.findMany({
      where: {
        schedule: {
          some: {
            lesson: {
              teacherId: session?.user.id,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        cap: true,
        studentOnclassroom: {
          select: {
            student: {
              select: {
                name: true,
                user: { select: { email: true } },
              },
            },
          },
        },
      },
      orderBy: { name: "asc" },
    })) ?? [];

  const rows: TeacherClassroomRow[] = classrooms.map((c) => ({
    id: c.id,
    name: c.name,
    cap: c.cap,
    students:
      c.studentOnclassroom.map((s) => ({
        name: s.student.name ?? "Bilinmiyor",
        email: s.student.user?.email ?? null,
      })) ?? [],
  }));

  return (
    <div className="mx-auto w-full">
      <TeacherClassroomTable rows={rows} />
    </div>
  );
};

export default TeacherClassroomPage;
