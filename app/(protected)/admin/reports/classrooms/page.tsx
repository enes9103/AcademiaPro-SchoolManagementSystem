import { ClassroomReportsTable } from "@/components/reports/ClassroomReportsTable";
import { db } from "@/lib/db";

const ClassroomReportsPage = async () => {
  const data = await db.classrooms
    .findMany({
      select: {
        id: true,
        name: true,
        cap: true,
        _count: {
          select: { studentOnclassroom: true },
        },
      },
      orderBy: { name: "asc" },
    })
    .finally(() => db.$disconnect());

  const rows = data.map((cls) => ({
    id: cls.id,
    name: cls.name,
    cap: Number(cls.cap),
    students: cls._count.studentOnclassroom,
  }));

  return (
    <div className="surface-panel min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <ClassroomReportsTable rows={rows} />
      </div>
    </div>
  );
};

export default ClassroomReportsPage;
