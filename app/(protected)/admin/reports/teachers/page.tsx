import { TeacherReportsTable } from "@/components/reports/TeacherReportsTable";
import { db } from "@/lib/db";
import { UserStatus } from "@prisma/client";

const TeacherReportsPage = async () => {
  const data = await db.teachers
    .findMany({
      select: {
        id: true,
        name: true,
        user: {
          select: {
            email: true,
            gender: true,
            status: true,
          },
        },
        _count: { select: { lesson: true } },
      },
      orderBy: { name: "asc" },
    })
    .finally(() => db.$disconnect());

  const rows = data.map((teacher) => ({
    id: teacher.id,
    name: teacher.name,
    email: teacher.user?.email ?? "",
    gender: teacher.user?.gender ?? "",
    status: teacher.user?.status ?? UserStatus.UNKNOW,
    lessons: teacher._count.lesson,
  }));

  return (
    <div className="surface-panel min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <TeacherReportsTable rows={rows} />
      </div>
    </div>
  );
};

export default TeacherReportsPage;
