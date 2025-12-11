"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--bg)] px-4 text-center">
      <h1 className="text-3xl font-bold text-[var(--text-primary)]">
        {t("notFound.title")}
      </h1>
      <p className="text-[var(--text-muted)]">{t("notFound.subtitle")}</p>
      <Link
        href="/home"
        className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
      >
        {t("notFound.back")}
      </Link>
    </div>
  );
}

export default NotFoundPage;
