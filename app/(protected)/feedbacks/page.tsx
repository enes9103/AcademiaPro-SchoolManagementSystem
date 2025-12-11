import React from "react";
import { FiMail, FiMessageSquare, FiPhone } from "react-icons/fi";

const contactOptions = [
  {
    title: "WhatsApp",
    description: "Hızlıca mesaj bırakın, en kısa sürede dönüş yapalım.",
    action: "WhatsApp'tan Yaz",
    href: "https://wa.me/6282294400729",
    icon: FiMessageSquare,
    color: "from-emerald-500 to-emerald-400",
  },
  {
    title: "E-posta",
    description: "Daha detaylı bir konu için e-posta atabilirsiniz.",
    action: "E-posta Gönder",
    href: "mailto:aryaferdyansahxiii@gmail.com",
    icon: FiMail,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Telefon",
    description: "Hafta içi 09:00-18:00 arası telefonla ulaşın.",
    action: "+62 822 9440 0729",
    href: "tel:+6282294400729",
    icon: FiPhone,
    color: "from-sky-500 to-indigo-500",
  },
];

const Page = () => {
  return (
    <div className="surface-panel rounded-3xl px-6 py-6 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Feedback & Contact
            </p>
            <h1 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
              Fikirlerinizi duymak istiyoruz
            </h1>
            <p className="max-w-2xl text-[var(--text-muted)]">
              AkademiaPro’yu daha iyi hale getirmek için öneri, hata bildirimi
              ya da merak ettiğiniz her şeyi bize iletin. İsterseniz formu
              doldurun, isterseniz direkt WhatsApp veya e-posta ile ulaşın.
            </p>
          </div>
          <div className="rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--accent)] shadow-md shadow-[var(--shadow)] backdrop-blur dark:bg-white/10 dark:text-white">
            Ortalama dönüş süresi: 1 iş günü
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1.5fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-6 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              Mesajınızı bırakın
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Form gönderildiğinde varsayılan e-posta istemciniz açılır. Konuyu
              ve mesajınızı yazın, gönderin.
            </p>
            <form
              action="mailto:aryaferdyansahxiii@gmail.com"
              method="POST"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2 mb-2">
                <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
                  Ad Soyad
                  <input
                    type="text"
                    name="name"
                    placeholder="Adınızı yazın"
                    className="w-full rounded-lg border border-[var(--border)] bg-white/70 px-3 py-2 text-[var(--text-primary)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 dark:bg-white/5"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-[var(--text-primary)]">
                  E-posta
                  <input
                    type="email"
                    name="email"
                    placeholder="ornek@domena.com"
                    className="w-full rounded-lg border border-[var(--border)] bg-white/70 px-3 py-2 text-[var(--text-primary)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 dark:bg-white/5"
                    required
                  />
                </label>
              </div>
              <label className="space-y-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                Konu
                <input
                  type="text"
                  name="subject"
                  placeholder="Geri bildirim konusu"
                  className="w-full rounded-lg border border-[var(--border)] bg-white/70 px-3 py-2 text-[var(--text-primary)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 dark:bg-white/5"
                  required
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-[var(--text-primary)] mb-2">
                Mesajınız
                <textarea
                  name="message"
                  placeholder="Öneri, hata bildirimi veya sorunuz..."
                  rows={5}
                  className="w-full rounded-lg border border-[var(--border)] bg-white/70 px-3 py-3 text-[var(--text-primary)] shadow-sm focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 dark:bg-white/5"
                  required
                />
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                >
                  Geri Bildirim Gönder
                </button>
                <p className="text-xs text-[var(--text-muted)]">
                  Form, cihazınızdaki e-posta uygulamasıyla açılır.
                </p>
              </div>
            </form>
          </div>

          <div className="grid gap-4">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <a
                  key={option.title}
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/80 p-5 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)] transition hover:-translate-y-0.5 hover:shadow-lg backdrop-blur dark:border-white/10 dark:bg-white/5"
                >
                  <div
                    className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${option.color}`}
                    aria-hidden
                  />
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-[var(--accent-soft)] p-3 text-[var(--accent)] transition group-hover:rotate-3 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">
                          {option.title}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">
                          {option.description}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center justify-center rounded-md bg-[var(--accent-soft)] px-3 py-1 text-sm font-semibold text-[var(--accent)] transition group-hover:underline">
                        {option.action}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
