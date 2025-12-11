interface TableShellProps {
  label?: string;
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const TableShell = ({
  label,
  title,
  actions,
  children,
}: TableShellProps) => {
  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      {(label || title || actions) && (
        <div className="flex items-center justify-between gap-3 pb-4">
          <div>
            {label && (
              <p className="text-xs font-semibold uppercase tracking-[0.2rem] text-[var(--text-muted)]">
                {label}
              </p>
            )}
            {title && (
              <h1 className="text-xl font-semibold text-[var(--text-primary)]">
                {title}
              </h1>
            )}
          </div>
          {actions}
        </div>
      )}
      <div className="max-w-full overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        {children}
      </div>
    </div>
  );
};
