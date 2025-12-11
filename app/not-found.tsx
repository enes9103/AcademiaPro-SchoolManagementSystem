"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1f2937] px-4 py-10 text-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 -top-20 h-60 w-60 rounded-full bg-[#2563eb]/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#06b6d4]/15 blur-3xl" />
      </div>
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-black text-white shadow-inner">
          404
        </div>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          {t("notFound.title")}
        </h1>
        <p className="mt-3 text-base text-white/70">
          {t("notFound.subtitle")}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#0f172a] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            {t("notFound.back")}
          </Link>
          <Link
            href="/help"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            {t("help.title")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
