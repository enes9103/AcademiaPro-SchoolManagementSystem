"use client";

import Link from "next/link";
import { FiExternalLink, FiMail, FiPhone } from "react-icons/fi";
import { useTranslation } from "react-i18next";

type Props = {
  status?: string | null;
};

export const UnknownHome = ({ status }: Props) => {
  const { t } = useTranslation();
  const cards = [
    {
      title: t("homeUnknown.cardContactTitle"),
      desc: t("homeUnknown.cardContactDesc"),
      action: {
        label: t("homeUnknown.ctaContact"),
        href: "/feedbacks",
        icon: FiMail,
      },
    },
    {
      title: t("homeUnknown.cardDemoTitle"),
      desc: t("homeUnknown.cardDemoDesc"),
      action: {
        label: t("homeUnknown.ctaDemo"),
        href: "/help",
        icon: FiExternalLink,
      },
    },
    {
      title: t("homeUnknown.cardSupportTitle"),
      desc: t("homeUnknown.cardSupportDesc"),
      action: {
        label: t("homeUnknown.ctaSupport"),
        href: "tel:+6282294400729",
        icon: FiPhone,
      },
    },
  ];

  const statusKey =
    status === "ACTIVE"
      ? "active"
      : status === "IN_ACTIVE"
        ? "inactive"
        : status === "BANNED"
          ? "banned"
          : status === "UNKNOW"
            ? "unknown"
            : null;

  const statusLabel = statusKey ? t(`status.${statusKey}`, statusKey) : null;

  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-8">
        <header className="space-y-3">
          <div className="flex justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t("homeUnknown.welcome")}
            </p>
            {statusLabel && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-700">
                {statusLabel}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            {t("homeUnknown.headline")}
          </h1>
          <p className="max-w-3xl text-[var(--text-muted)]">
            {t("homeUnknown.subtitle")}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.action.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)] transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  {card.desc}
                </p>
                <Link
                  href={card.action.href}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
                >
                  <Icon className="h-4 w-4" />
                  {card.action.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
