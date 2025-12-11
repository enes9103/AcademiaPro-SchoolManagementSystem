"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 dark:backdrop-blur-sm px-4">
      <div className="relative w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--border)] px-6 py-4">
          <div>
            {title && <h3 className="text-xl font-semibold">{title}</h3>}
            {description && (
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {description}
              </p>
            )}
          </div>
          {/* <button className="btnClose" onClick={onClose} type="button">
            Close
          </button> */}
        </div>
        <div className="px-6 py-5 ">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
