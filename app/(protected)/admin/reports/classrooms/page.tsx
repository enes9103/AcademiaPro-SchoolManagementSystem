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
    <div className="mx-auto w-full">
      <ClassroomReportsTable rows={rows} />
    </div>
  );
};

export default ClassroomReportsPage;
