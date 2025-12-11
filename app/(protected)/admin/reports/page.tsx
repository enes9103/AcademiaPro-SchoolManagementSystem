import Link from "next/link";

const ReportsIndex = () => {
  const links = [
    { title: "Classroom Reports", href: "/admin/reports/classrooms" },
    { title: "Teacher Reports", href: "/admin/reports/teachers" },
    { title: "Student Reports", href: "/admin/reports/students" },
  ];

  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
            Reports
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Analiz ve Listeleme
          </h1>
          <p className="text-[var(--text-muted)]">
            Sınıf, öğretmen ve öğrenci raporlarına buradan erişebilirsiniz.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-6 text-center text-[var(--text-primary)] shadow transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            >
              <p className="text-sm font-semibold">{link.title}</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Listele, ara, filtrele ve detayına git.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsIndex;
