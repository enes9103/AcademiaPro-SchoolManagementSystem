"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe, FiCheck } from "react-icons/fi";

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "de", label: "Deutsch" },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language || "en");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    const initial = stored || i18n.language || "en";
    setLang(initial);
    i18n.changeLanguage(initial);
    if (typeof document !== "undefined") document.documentElement.lang = initial;
  }, [i18n]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const onChange = (value: string) => {
    setLang(value);
    localStorage.setItem("lang", value);
    i18n.changeLanguage(value);
    if (typeof document !== "undefined") document.documentElement.lang = value;
    setOpen(false);
  };

  const currentLabel =
    LANG_OPTIONS.find((opt) => opt.code === lang)?.label ||
    lang.toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("languages.label", "Select language")}
      >
        <FiGlobe className="h-4 w-4 text-[var(--text-muted)]" />
        <span>{t(`languages.${lang}`, currentLabel)}</span>
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_20px_50px_-25px_rgba(15,23,42,0.45)] backdrop-blur">
          <ul role="listbox" className="space-y-1">
            {LANG_OPTIONS.map((opt) => {
              const active = opt.code === lang;
              return (
                <li key={opt.code}>
                  <button
                    type="button"
                    onClick={() => onChange(opt.code)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--text-primary)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--surface-hover)]"
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    <span>{t(`languages.${opt.code}`, opt.label)}</span>
                    {active && <FiCheck className="h-4 w-4 text-[var(--accent)]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
