"use client";
import React from "react";
import CardDataStats from "../CardDataStats";
import { FiBookOpen, FiClipboard, FiGrid, FiUsers } from "react-icons/fi";

import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { useTranslation } from "react-i18next";

interface DashboardProps {
  totalDataCard: {
    totalClassrooms: any;
    totalUsers: any;
    totalLessons: any;
    totalAssignments: any;
  };
}
const Dashboard: React.FC<DashboardProps> = ({ totalDataCard }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="surface-panel mb-6 flex flex-col gap-4 rounded-3xl px-6 py-5 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.25rem] text-[var(--text-muted)]">
              {t("dashboard.label")}
            </p>
            <h1 className="font-grotesk text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl dark:text-white">
              {t("dashboard.headline")}
            </h1>
            <p className="muted max-w-3xl text-sm">
              {t("dashboard.subtitle")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] dark:text-white">
              {t("dashboard.ctaNew")}
            </button>
            <button className="rounded-full bg-gradient-to-r from-sky-400 to-emerald-300 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-sky-500/30">
              {t("dashboard.ctaReport")}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <RoleGate allowedRole={UserRole.ADMIN || UserRole.TEACHER}>
          <CardDataStats
            title={t("dashboard.cards.classrooms")}
            total={totalDataCard.totalClassrooms}
            rate="+0.43%"
            levelUp
          >
            <FiGrid className="h-6 w-6 text-sky-500" />
          </CardDataStats>
        </RoleGate>
        <CardDataStats
          title={t("dashboard.cards.lessons")}
          total={totalDataCard.totalLessons}
          rate="+4.35%"
          levelUp
        >
          <FiBookOpen className="h-6 w-6 text-sky-500" />
        </CardDataStats>
        <CardDataStats
          title={t("dashboard.cards.assignments")}
          total={totalDataCard.totalAssignments}
          rate="+2.59%"
          levelUp
        >
          <FiClipboard className="h-6 w-6 text-sky-500" />
        </CardDataStats>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <CardDataStats
            title={t("dashboard.cards.users")}
            total={totalDataCard.totalUsers}
            rate="-0.95%"
            levelDown
          >
            <FiUsers className="h-6 w-6 text-sky-500" />
          </CardDataStats>
        </RoleGate>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:mt-8">
        <div className="surface-panel rounded-3xl p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="font-grotesk text-xl font-semibold text-slate-900 dark:text-white">
              {t("dashboard.quickLook")}
            </h3>
            <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-white/10 dark:text-sky-100">
              {t("dashboard.live")}
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-200">
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <span>{t("dashboard.ratio")}</span>
              <span className="font-semibold text-slate-900 dark:text-white">1:{Math.max(1, Math.round(Number(totalDataCard.totalLessons || 1) / Number(totalDataCard.totalClassrooms || 1) || 1))}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <span>{t("dashboard.perAssignment")}</span>
              <span className="font-semibold text-slate-900 dark:text-white">~{Number(totalDataCard.totalAssignments || 0) > 0 ? "1+" : "0"}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <span>{t("dashboard.updates")}</span>
              <span className="text-emerald-600 dark:text-emerald-300">{t("dashboard.active")}</span>
            </div>
          </div>
        </div>

        <div className="surface-panel rounded-3xl p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h3 className="font-grotesk text-xl font-semibold text-slate-900 dark:text-white">
              {t("dashboard.upcoming")}
            </h3>
            <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-semibold text-slate-800 dark:bg-white/10 dark:text-sky-100">
              {t("dashboard.plan")}
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-200">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <p className="text-slate-900 dark:text-white">{t("dashboard.todo1")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{t("dashboard.todo1desc")}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <p className="text-slate-900 dark:text-white">{t("dashboard.todo2")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{t("dashboard.todo2desc")}</p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
              <p className="text-slate-900 dark:text-white">{t("dashboard.todo3")}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">{t("dashboard.todo3desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
