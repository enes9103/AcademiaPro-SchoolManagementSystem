import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DataTable } from "@/components/common/data-table";

type ScheduleRow = {
  id: string;
  lesson: string;
  classroom: string;
  date: string;
  time: string;
  teacher: string;
};

const StudentSchedulePage = async () => {
  const session = await auth();

  const student = await db.students.findUnique({
    where: { userId: session?.user.id },
    select: {
      onClassroom: {
        select: {
          classroom: { select: { id: true, name: true } },
        },
      },
    },
  });

  const classIds = student?.onClassroom.map((c) => c.classroom.id) ?? [];

  const schedules =
    classIds.length > 0
      ? await db.schedule.findMany({
          where: { classId: { in: classIds } },
          select: {
            id: true,
            day: true,
            time: true,
            classroom: { select: { name: true } },
            lesson: {
              select: {
                name: true,
                teacher: { select: { name: true } },
              },
            },
          },
          orderBy: { day: "asc" },
        })
      : [];

  const rows: ScheduleRow[] = schedules.map((s) => ({
    id: s.id,
    lesson: s.lesson.name,
    classroom: s.classroom.name,
    date: new Date(s.day).toLocaleDateString("tr-TR"),
    time: s.time,
    teacher: s.lesson.teacher?.name ?? "",
  }));

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={[
          { header: "Ders", accessorKey: "lesson" },
          { header: "Sınıf", accessorKey: "classroom" },
          { header: "Tarih", accessorKey: "date" },
          { header: "Saat", accessorKey: "time" },
          { header: "Öğretmen", accessorKey: "teacher" },
        ]}
        data={rows}
        label="Student"
        title="Schedule"
        enableSearch
        searchPlaceholder="Ders veya sınıf ara..."
        useUrlPagination
        pageSize={10}
      />
    </div>
  );
};

export default StudentSchedulePage;
