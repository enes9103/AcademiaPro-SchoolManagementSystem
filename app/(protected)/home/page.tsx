import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { getTotals } from "@/data/card";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { FiExternalLink, FiMail, FiPhone } from "react-icons/fi";

const UnknownHome = () => {
  const cards = [
    {
      title: "Kayıt Olun",
      desc: "AkademiaPro&apos;ya katılın, sınıf/schedule/assignment takibini tek panelden yönetin. Kayıt için bize ulaşın.",
      action: { label: "İletişime Geç", href: "/feedbacks", icon: FiMail },
    },
    {
      title: "Fırsatları Keşfedin",
      desc: "Ödev yönetimi, program planlama, öğrenci/öğretmen raporları ve daha fazlası. Demo talep edin.",
      action: { label: "Demo İste", href: "/help", icon: FiExternalLink },
    },
    {
      title: "Destek Alın",
      desc: "Kayıt süreci veya erişim için destek ekibimizle iletişime geçin. Telefon ya da e-posta ile ulaşabilirsiniz.",
      action: { label: "Destek", href: "tel:+6282294400729", icon: FiPhone },
    },
  ];

  return (
    <div className="surface-panel rounded-3xl px-6 pb-4 pt-5 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
            Hoş Geldiniz
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            AkademiaPro&apos;yu kullanmaya başlamak için kaydolun
          </h1>
          <p className="max-w-3xl text-[var(--text-muted)]">
            Sınıf, ders programı ve ödev takibini tek panelden yönetin. Kayıt
            olmak veya demo talep etmek için aşağıdaki adımlardan birini seçin.
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

const Home = async () => {
  const session = await auth();

  if (session?.user?.role === UserRole.UNKNOW) {
    return <UnknownHome />;
  }

  const totalDataCard = await getTotals();

  return (
    <div>
      <Dashboard totalDataCard={totalDataCard} />
    </div>
  );
};

export default Home;
