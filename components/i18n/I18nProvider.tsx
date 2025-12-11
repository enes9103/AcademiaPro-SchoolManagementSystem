"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/client";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    const initial = stored || "en";
    i18n.changeLanguage(initial);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
    }
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
