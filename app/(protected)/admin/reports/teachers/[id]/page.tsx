import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { db } from "@/lib/db";
import {
  TeacherScheduleRow,
  TeacherScheduleTable,
} from "@/components/reports/TeacherScheduleTable";

const TeacherReportDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const teacher = await db.teachers
    .findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        user: { select: { email: true } },
        lesson: {
          select: {
            id: true,
            name: true,
            schedule: {
              select: {
                id: true,
                day: true,
                time: true,
                classroom: {
                  select: {
                    id: true,
                    name: true,
                    cap: true,
                    studentOnclassroom: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .finally(() => db.$disconnect());

  if (!teacher) return notFound();

  const rows: TeacherScheduleRow[] = [];

  teacher.lesson.forEach((lesson) => {
    lesson.schedule.forEach((schedule) => {
      rows.push({
        id: schedule.id,
        className: schedule.classroom.name,
        lessonName: lesson.name,
        date: schedule.day.toISOString(),
        time: schedule.time,
        students: schedule.classroom.studentOnclassroom.length,
        capacity: Number(schedule.classroom.cap),
      });
    });
  });

  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/teachers"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {teacher.name}
            </h1>
            {teacher.user?.email && (
              <p className="text-sm text-[var(--text-muted)]">
                {teacher.user.email}
              </p>
            )}
          </div>
        </div>

        <TeacherScheduleTable rows={rows} />
      </div>
    </div>
  );
};

export default TeacherReportDetailPage;
