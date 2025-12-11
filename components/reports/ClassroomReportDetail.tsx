"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { ClassroomStudentsTable, ClassroomStudentRow } from "./ClassroomStudentsTable";

type TeacherInfo = { name: string; email: string };

export const ClassroomReportDetail = ({
  classroomName,
  teachers,
  students,
}: {
  classroomName: string;
  teachers: TeacherInfo[];
  students: ClassroomStudentRow[];
}) => {
  const { t } = useTranslation();
  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto w-full space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/classrooms"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            {t("reports.classroomDetail.back")}
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {classroomName}
          </h1>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--text-primary)]">
          <p className="text-sm font-semibold">{t("reports.classroomDetail.teachers")}</p>
          {teachers.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {teachers.map((teacher) => (
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
              {t("reports.classroomDetail.noTeacher")}
            </p>
          )}
        </div>

        <ClassroomStudentsTable rows={students} />
      </div>
    </div>
  );
};
