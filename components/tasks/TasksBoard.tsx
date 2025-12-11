"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/common/modal";
import { format } from "date-fns";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Task, TaskStatus } from "./taskTypes";

const STATUS_ORDER: TaskStatus[] = ["todo", "inProgress", "onHold", "done"];

export const TasksBoard = () => {
  const { t } = useTranslation();
  const user = useCurrentUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "todo" as TaskStatus,
    due: new Date().toISOString().substring(0, 10),
  });
  const [loaded, setLoaded] = useState(false);

  const storageKey = useMemo(
    () => `tasks:${user?.id ?? "guest"}`,
    [user?.id]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Task[];
        setTasks(parsed);
        setLoaded(true);
        return;
      } catch (e) {
        // ignore parse error
      }
    }
    const seed: Task[] = [
      {
        id: crypto.randomUUID(),
        title: "Design onboarding flow",
        description: "Review steps and add metrics",
        status: "todo",
        due: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Update class reports",
        description: "Refresh datasets and export",
        status: "inProgress",
        due: new Date(Date.now() + 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "Publish FAQ content",
        description: "Student/Teacher specific sections",
        status: "onHold",
        due: new Date(Date.now() + 2 * 86400000).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: "QA assignment modals",
        description: "Check validation and translations",
        status: "done",
        due: new Date(Date.now() - 86400000).toISOString(),
      },
    ];
    setTasks(seed);
    setLoaded(true);
    localStorage.setItem(storageKey, JSON.stringify(seed));
  }, [storageKey]);

  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [loaded, storageKey, tasks]);

  const grouped = useMemo(() => {
    return STATUS_ORDER.map((status) => ({
      status,
      tasks: tasks.filter((t) => t.status === status),
    }));
  }, [tasks]);

  const handleDrop = (status: TaskStatus) => {
    if (!draggedId) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === draggedId ? { ...t, status } : t))
    );
    setDraggedId(null);
  };

  const handleCreate = () => {
    if (!form.title.trim()) return;
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: form.title,
        description: form.description,
        status: form.status,
        due: new Date(form.due).toISOString(),
      },
    ]);
    setShowModal(false);
    setForm({
      title: "",
      description: "",
      status: "todo",
      due: new Date().toISOString().substring(0, 10),
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="surface-panel rounded-3xl px-6 pb-6 pt-5 sm:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t("nav.items.tasks")}
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            {t("tasks.title")}
          </h1>
          <p className="max-w-2xl text-[var(--text-muted)]">
            {t("tasks.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
        >
          <FiPlus className="h-4 w-4" />
          {t("tasks.add")}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {grouped.map(({ status, tasks: list }) => (
          <div
            key={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(status);
            }}
            className="flex min-h-[420px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)]"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {t(`tasks.columns.${status}`)}
              </h3>
              <span className="rounded-full bg-[var(--surface-strong)] px-2 py-1 text-xs font-semibold text-[var(--text-primary)]">
                {list.length}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3">
              {list.length === 0 && (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-hover)] px-3 py-6 text-center text-xs text-[var(--text-muted)]">
                  {t("tasks.empty")}
                </div>
              )}
              {list.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => setDraggedId(task.id)}
                  className="group relative rounded-xl border border-[var(--border)] bg-white/70 p-4 shadow hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-lg dark:bg-[var(--surface)]"
                >
                  {status === "done" && (
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="absolute left-2 top-2 inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 text-[var(--text-muted)] hover:text-red"
                      aria-label={t("tasks.delete")}
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <h4 className="text-base font-semibold text-[var(--text-primary)]">
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {task.description}
                    </p>
                  )}
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                    {t("tasks.due")}: {format(new Date(task.due), "dd MMM yyyy")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={t("tasks.modalTitle")}>
        <div className="space-y-3">
          <div>
            <label className="modal-label" htmlFor="taskTitle">
              {t("tasks.form.title")}
            </label>
            <input
              id="taskTitle"
              className="modal-input"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder={t("tasks.form.title")}
            />
          </div>
          <div>
            <label className="modal-label" htmlFor="taskDesc">
              {t("tasks.form.desc")}
            </label>
            <textarea
              id="taskDesc"
              className="modal-input min-h-[80px]"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder={t("tasks.form.desc")}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="modal-label" htmlFor="taskStatus">
                {t("tasks.form.status")}
              </label>
              <select
                id="taskStatus"
                className="modal-select"
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as TaskStatus }))}
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {t(`tasks.columns.${s}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="modal-label" htmlFor="taskDue">
                {t("tasks.form.date")}
              </label>
              <input
                id="taskDue"
                type="date"
                className="modal-input"
                value={form.due}
                onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btnClose" type="button" onClick={() => setShowModal(false)}>
            {t("tasks.form.cancel")}
          </button>
          <button className="btnSave" type="button" onClick={handleCreate}>
            {t("tasks.form.create")}
          </button>
        </div>
      </Modal>
    </div>
  );
};
