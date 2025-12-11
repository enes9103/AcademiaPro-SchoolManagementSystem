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
          <Badge variant="outline" className="capitalize">
            {user.status ?? "—"}
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
