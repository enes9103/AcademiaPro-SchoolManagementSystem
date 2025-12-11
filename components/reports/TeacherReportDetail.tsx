"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { TeacherScheduleRow, TeacherScheduleTable } from "./TeacherScheduleTable";

export const TeacherReportDetail = ({
  teacherName,
  email,
  rows,
}: {
  teacherName: string;
  email?: string | null;
  rows: TeacherScheduleRow[];
}) => {
  const { t } = useTranslation();
  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/teachers"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            {t("reports.teacherDetail.back")}
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {teacherName}
            </h1>
            {email && (
              <p className="text-sm text-[var(--text-muted)]">
                {email}
              </p>
            )}
          </div>
        </div>

        <TeacherScheduleTable rows={rows} />
      </div>
    </div>
  );
};
