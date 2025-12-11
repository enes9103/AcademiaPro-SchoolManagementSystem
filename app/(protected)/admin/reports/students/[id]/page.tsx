import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { db } from "@/lib/db";
import { StudentDetailRow, StudentDetailTable } from "@/components/reports/StudentDetailTable";

const StudentReportDetailPage = async ({ params }: { params: { id: string } }) => {
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
    <div className="surface-panel min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/students"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {student.name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {student.user?.email ?? "E-posta yok"} • {student.user?.status ?? ""}
            </p>
          </div>
        </div>

        <StudentDetailTable rows={rows} />
      </div>
    </div>
  );
};

export default StudentReportDetailPage;
