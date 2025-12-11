import { StudentReportsTable } from "@/components/reports/StudentReportsTable";
import { db } from "@/lib/db";
import { UserStatus } from "@prisma/client";

const StudentReportsPage = async () => {
  const data = await db.students
    .findMany({
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
            classroom: { select: { name: true } },
          },
        },
      },
      orderBy: { name: "asc" },
    })
    .finally(() => db.$disconnect());

  const rows = data.map((student) => ({
    id: student.id,
    name: student.name ?? "",
    email: student.user?.email ?? "",
    status: student.user?.status ?? UserStatus.UNKNOW,
    classrooms: student.onClassroom.map((c) => c.classroom?.name ?? ""),
  }));

  return (
    <div className="mx-auto w-full">
      <StudentReportsTable rows={rows} />
    </div>
  );
};

export default StudentReportsPage;
