"use client";

import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

type ProfileCardProps = {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    status?: string | null;
    createdAt?: string | null;
  };
};

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const { t } = useTranslation();
  const normalized = user.status?.toString().trim().toUpperCase();
  const statusKey =
    normalized === "ACTIVE"
      ? "active"
      : normalized === "IN_ACTIVE"
        ? "inactive"
        : normalized === "BANNED"
          ? "banned"
          : normalized === "UNKNOW"
            ? "unknown"
            : null;
  const statusLabel = statusKey ? t(`status.${statusKey}`, statusKey) : user.status;
  const statusClass =
    statusKey === "active"
      ? "border-emerald-200 bg-emerald-100 text-emerald-700"
      : statusKey === "banned"
        ? "border-red-200 bg-red-100 text-red-700"
        : "border-amber-200 bg-amber-100 text-amber-700";

  return (
    <div className="surface-panel rounded-3xl px-6 pb-6 pt-5 sm:px-8">
      <header className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t("profile.subtitle")}
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">
          {t("profile.title")}
        </h1>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">
            {t("profile.name")}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            {user.name ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">
            {t("profile.email")}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            {user.email ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">
            {t("profile.role")}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            {user.role ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">
            {t("profile.status")}
          </p>
          <Badge variant="outline" className={`capitalize ${statusClass}`}>
            {statusLabel ?? "—"}
          </Badge>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">
            {t("profile.joined")}
          </p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            {user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "—"}
          </p>
        </div>
      </div>
    </div>
  );
};
