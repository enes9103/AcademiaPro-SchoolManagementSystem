"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { useTranslation } from "react-i18next";

type Item = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  cta?: { label: string; href: string };
};

const items = (t: any): Item[] => [
  {
    id: "student-create",
    title: t("help.admin.student.title"),
    summary: t("help.admin.student.summary"),
    steps: t("help.admin.student.steps", { returnObjects: true }),
    cta: { label: t("help.admin.student.cta"), href: "/protected/admin/list/student" },
  },
  {
    id: "teacher-create",
    title: t("help.admin.teacher.title"),
    summary: t("help.admin.teacher.summary"),
    steps: t("help.admin.teacher.steps", { returnObjects: true }),
    cta: { label: t("help.admin.teacher.cta"), href: "/protected/admin/list/teacher" },
  },
  {
    id: "lesson-create",
    title: t("help.admin.lesson.title"),
    summary: t("help.admin.lesson.summary"),
    steps: t("help.admin.lesson.steps", { returnObjects: true }),
    cta: { label: t("help.admin.lesson.cta"), href: "/protected/admin/manage/lesson" },
  },
  {
    id: "classroom-create",
    title: t("help.admin.classroom.title"),
    summary: t("help.admin.classroom.summary"),
    steps: t("help.admin.classroom.steps", { returnObjects: true }),
    cta: { label: t("help.admin.classroom.cta"), href: "/protected/admin/manage/classroom" },
  },
  {
    id: "schedule-add",
    title: t("help.admin.schedule.title"),
    summary: t("help.admin.schedule.summary"),
    steps: t("help.admin.schedule.steps", { returnObjects: true }),
    cta: { label: t("help.admin.schedule.cta"), href: "/protected/admin/manage/schedule" },
  },
  {
    id: "assignment-add",
    title: t("help.admin.assignment.title"),
    summary: t("help.admin.assignment.summary"),
    steps: t("help.admin.assignment.steps", { returnObjects: true }),
    cta: { label: t("help.admin.assignment.cta"), href: "/protected/teacher/assignment" },
  },
];

const studentItems = (t: any): Item[] => [
  {
    id: "student-classroom",
    title: t("help.student.classroom.title"),
    summary: t("help.student.classroom.summary"),
    steps: t("help.student.classroom.steps", { returnObjects: true }),
    cta: { label: t("help.student.classroom.cta"), href: "/student/classroom" },
  },
  {
    id: "student-assignments",
    title: t("help.student.assignments.title"),
    summary: t("help.student.assignments.summary"),
    steps: t("help.student.assignments.steps", { returnObjects: true }),
    cta: { label: t("help.student.assignments.cta"), href: "/student/assignments" },
  },
  {
    id: "student-schedule",
    title: t("help.student.schedule.title"),
    summary: t("help.student.schedule.summary"),
    steps: t("help.student.schedule.steps", { returnObjects: true }),
    cta: { label: t("help.student.schedule.cta"), href: "/student/schedule" },
  },
];

const teacherItems = (t: any): Item[] => [
  {
    id: "teacher-classroom",
    title: t("help.teacher.classroom.title"),
    summary: t("help.teacher.classroom.summary"),
    steps: t("help.teacher.classroom.steps", { returnObjects: true }),
    cta: { label: t("help.teacher.classroom.cta"), href: "/teacher/classroom" },
  },
  {
    id: "teacher-schedule",
    title: t("help.teacher.schedule.title"),
    summary: t("help.teacher.schedule.summary"),
    steps: t("help.teacher.schedule.steps", { returnObjects: true }),
    cta: { label: t("help.teacher.schedule.cta"), href: "/teacher/schedule" },
  },
  {
    id: "teacher-assignments",
    title: t("help.teacher.assignments.title"),
    summary: t("help.teacher.assignments.summary"),
    steps: t("help.teacher.assignments.steps", { returnObjects: true }),
    cta: { label: t("help.teacher.assignments.cta"), href: "/teacher/assignment" },
  },
];

const unknownItems = (t: any): Item[] => [
  {
    id: "unknown-register",
    title: t("help.unknown.register.title"),
    summary: t("help.unknown.register.summary"),
    steps: t("help.unknown.register.steps", { returnObjects: true }),
    cta: { label: t("help.unknown.register.cta"), href: "/feedbacks" },
  },
  {
    id: "unknown-support",
    title: t("help.unknown.support.title"),
    summary: t("help.unknown.support.summary"),
    steps: t("help.unknown.support.steps", { returnObjects: true }),
    cta: { label: t("help.unknown.support.cta"), href: "/feedbacks" },
  },
];

const HelpPage = () => {
  const { t } = useTranslation();
  const role = useCurrentRole();
  const list = useMemo(() => {
    if (role === UserRole.STUDENT) return studentItems(t);
    if (role === UserRole.TEACHER) return teacherItems(t);
    if (role === UserRole.UNKNOW) return unknownItems(t);
    return items(t);
  }, [role, t]);

  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  useEffect(() => {
    setOpenId(list[0]?.id ?? null);
  }, [list]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="surface-panel rounded-3xl px-6 py-6 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t("help.title")}
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {t("help.title")}
          </h1>
          <p className="max-w-3xl text-[var(--text-muted)]">
            {t("help.subtitle")}
          </p>
        </header>

        <div className="space-y-3">
          {list.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/80 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)] backdrop-blur transition hover:border-[var(--border-strong)] dark:border-white/10 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.summary}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
                    {isOpen ? (
                      <FiChevronUp className="h-5 w-5" />
                    ) : (
                      <FiChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-primary)] dark:border-white/10">
                    <ul className="mb-4 list-disc space-y-1 pl-5 text-[var(--text-muted)]">
                      {item.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                    {item.cta && (
                      <a
                        href={item.cta.href}
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                      >
                        {item.cta.label}
                        <FiExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
