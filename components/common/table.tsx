import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Table = ({ children }: { children: ReactNode }) => (
  <table className="w-full table-auto">{children}</table>
);

export const TableHeadRow = ({ children }: { children: ReactNode }) => (
  <tr className="text-left bg-[var(--surface-strong)] text-[var(--text-primary)]">
    {children}
  </tr>
);

export const TableHeadCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <th className={cn("px-4 py-4 text-sm font-semibold", className)}>
    {children}
  </th>
);

export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody>{children}</tbody>
);

export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className="odd:bg-[var(--surface)] even:bg-[var(--surface-strong)]">
    {children}
  </tr>
);

export const TableCell = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <td
    className={cn(
      "border-b border-[var(--border)] px-4 py-5 text-[var(--text-primary)]",
      className
    )}
  >
    {children}
  </td>
);
