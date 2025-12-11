"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
  { code: "de", label: "Deutsch" },
];

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState<string>(i18n.language || "en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    const initial = stored || i18n.language || "en";
    setLang(initial);
    i18n.changeLanguage(initial);
    if (typeof document !== "undefined") document.documentElement.lang = initial;
  }, [i18n]);

  const onChange = (value: string) => {
    setLang(value);
    localStorage.setItem("lang", value);
    i18n.changeLanguage(value);
    if (typeof document !== "undefined") document.documentElement.lang = value;
  };

  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 pr-8 text-sm font-medium text-[var(--text-primary)] shadow-sm hover:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
        aria-label="Select language"
      >
        {LANG_OPTIONS.map((opt) => (
          <option key={opt.code} value={opt.code}>
            {t(`languages.${opt.code}`, opt.label)}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">▼</span>
    </div>
  );
};
