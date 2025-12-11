import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { UserStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ClassroomStudentsTable, ClassroomStudentRow } from "@/components/reports/ClassroomStudentsTable";

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
        name: t?.name ?? "Bilinmiyor",
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
    <div className="surface-panel min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/classrooms"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {classroom.name}
          </h1>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)]">
          <p className="text-sm font-semibold">Sorumlu Öğretmen(ler)</p>
          {uniqueTeachers.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {uniqueTeachers.map((teacher) => (
                <span
                  key={`${teacher.name}-${teacher.email}`}
                  className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent)]"
                >
                  {teacher.name}
                  {teacher.email ? ` • ${teacher.email}` : ""}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--text-muted)] mt-2">
              Bu sınıfa atanmış öğretmen bulunmuyor.
            </p>
          )}
        </div>

        <ClassroomStudentsTable rows={studentRows} />
      </div>
    </div>
  );
};

export default ClassroomReportDetailPage;
