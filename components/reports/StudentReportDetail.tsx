"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { StudentDetailRow, StudentDetailTable } from "./StudentDetailTable";

export const StudentReportDetail = ({
  name,
  email,
  status,
  rows,
}: {
  name: string;
  email?: string | null;
  status?: string | null;
  rows: StudentDetailRow[];
}) => {
  const { t } = useTranslation();
  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto w-full space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reports/students"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
          >
            <FiArrowLeft className="h-4 w-4" />
            {t("reports.studentDetail.back")}
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {name}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">
              {email || t("reports.studentDetail.noEmail")}{" "}
              {status ? ` • ${status}` : ""}
            </p>
          </div>
        </div>

        <StudentDetailTable rows={rows} />
      </div>
    </div>
  );
};
