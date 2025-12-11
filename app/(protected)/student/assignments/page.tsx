import { auth } from "@/auth";
import { db } from "@/lib/db";
import { DataTable } from "@/components/common/data-table";

type AssignmentRow = {
  id: string;
  task: string;
  lesson: string;
  classroom: string;
  deadline: string;
  time: string;
  teacher: string;
};

const StudentAssignmentsPage = async () => {
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

  const assignments =
    classIds.length > 0
      ? await db.assignments.findMany({
          where: { classId: { in: classIds } },
          select: {
            id: true,
            task: true,
            deadline: true,
            time: true,
            classroom: { select: { name: true } },
            lesson: { select: { name: true } },
            teacher: { select: { name: true } },
          },
          orderBy: { deadline: "asc" },
        })
      : [];

  const rows: AssignmentRow[] = assignments.map((a) => ({
    id: a.id,
    task: a.task,
    lesson: a.lesson.name,
    classroom: a.classroom.name,
    deadline: new Date(a.deadline).toLocaleDateString("tr-TR"),
    time: a.time,
    teacher: a.teacher.name ?? "",
  }));

  return (
    <div className="mx-auto w-full">
      <DataTable
        columns={[
          { header: "Görev", accessorKey: "task" },
          { header: "Ders", accessorKey: "lesson" },
          { header: "Sınıf", accessorKey: "classroom" },
          { header: "Deadline", accessorKey: "deadline" },
          { header: "Saat", accessorKey: "time" },
          { header: "Öğretmen", accessorKey: "teacher" },
        ]}
        data={rows}
        label="Student"
        title="Assignments"
        enableSearch
        searchPlaceholder="Görev veya ders ara..."
        useUrlPagination
        pageSize={10}
      />
    </div>
  );
};

export default StudentAssignmentsPage;
