import React, { ReactNode } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="surface-card group relative overflow-hidden rounded-2xl px-6 py-5 backdrop-blur transition hover:-translate-y-0.5">
      <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-40 bg-gradient-to-br from-sky-300/30 via-indigo-300/20 to-teal-200/20 dark:from-sky-400/30 dark:via-indigo-400/20 dark:to-teal-300/20" />
      <div className="relative flex items-center justify-between text-slate-900 dark:text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] dark:border-white/15 dark:bg-white/10 dark:text-sky-100">
          {children}
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            levelUp
              ? "text-emerald-600 dark:text-emerald-300"
              : levelDown
                ? "text-rose-500 dark:text-rose-300"
                : "text-slate-500 dark:text-slate-200"
          }`}
        >
          {rate}
          {levelUp && (
            <FiTrendingUp className="h-3.5 w-3.5" />
          )}
          {levelDown && (
            <FiTrendingDown className="h-3.5 w-3.5" />
          )}
        </span>
      </div>

      <div className="relative mt-5 space-y-2 text-slate-900 dark:text-white">
        <div>
          <h4 className="text-3xl font-semibold">
            {total}
          </h4>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-300">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
