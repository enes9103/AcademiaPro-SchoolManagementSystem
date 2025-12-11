"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

type Item = {
  id: string;
  title: string;
  summary: string;
  steps: string[];
  cta?: { label: string; href: string };
};

const items: Item[] = [
  {
    id: "student-create",
    title: "Öğrenci nasıl oluşturabilirim?",
    summary:
      "Admin panelinde öğrenci kaydı açıp ilgili sınıfa ekleme adımları.",
    steps: [
      "Sol menüden Students sayfasına gidin.",
      "Sağ üstteki Add butonuna tıklayın.",
      "Formda öğrenci bilgilerini girin ve sınıf seçimini yapın.",
      "Save Changes ile kaydedin; ardından öğrenciyi sınıfa eklediğinizi kontrol edin.",
    ],
    cta: {
      label: "Students sayfasına git",
      href: "/protected/admin/list/student",
    },
  },
  {
    id: "teacher-create",
    title: "Öğretmen nasıl eklenir?",
    summary: "Yeni öğretmen hesabı açma ve ders atama süreci.",
    steps: [
      "Users veya Teachers sayfasına gidin.",
      "Add butonuyla kullanıcı/öğretmen kartını oluşturun.",
      "Gerekirse Teacher tablosundan Edit ile branş/ders atamasını yapın.",
    ],
    cta: {
      label: "Teachers sayfasına git",
      href: "/protected/admin/list/teacher",
    },
  },
  {
    id: "lesson-create",
    title: "Ders nasıl oluşturulur ve öğretmen atanır?",
    summary: "Yeni ders açma ve ilgili öğretmeni bağlama adımları.",
    steps: [
      "Manage > Lessons sayfasına gidin.",
      "Add butonuna basın, ders adını ve kategorisini girin.",
      "Teacher açılır listesinden dersi verecek öğretmeni seçin.",
      "Save Changes ile kaydedin.",
    ],
    cta: {
      label: "Lessons sayfasına git",
      href: "/protected/admin/manage/lesson",
    },
  },
  {
    id: "classroom-create",
    title: "Sınıf nasıl oluşturulur ve öğrenci eklenir?",
    summary: "Yeni sınıf oluşturup mevcut öğrencileri ekleme akışı.",
    steps: [
      "Manage > Classroom sayfasına gidin ve Add butonuna tıklayın.",
      "Sınıf adı ve kapasiteyi girin, Save Changes ile kaydedin.",
      "Students sayfasında ilgili öğrenci için Add ile sınıfa ekleyin.",
    ],
    cta: {
      label: "Classrooms sayfasına git",
      href: "/protected/admin/manage/classroom",
    },
  },
  {
    id: "schedule-add",
    title: "Ders programına oturum nasıl eklerim?",
    summary: "Ders, öğretmen ve sınıfı eşleştirerek program girişi yapma.",
    steps: [
      "Manage > Schedule sayfasına gidin.",
      "Add butonuyla gün, saat, ders ve sınıf seçimini yapın.",
      "Save Changes ile kaydedin; tablo üzerinden kontrol edin.",
    ],
    cta: {
      label: "Schedule sayfasına git",
      href: "/protected/admin/manage/schedule",
    },
  },
  {
    id: "assignment-add",
    title: "Ödev nasıl eklenir ve dosya yüklenir?",
    summary: "Öğretmenler için ödev oluşturma ve dosya yükleme adımları.",
    steps: [
      "Assignments sayfasında Add butonuna tıklayın.",
      "Başlık, ders, sınıf ve teslim tarihini girin.",
      "Gerekirse dosya ekleyin ve Save Changes ile kaydedin.",
    ],
    cta: {
      label: "Assignments sayfasına git",
      href: "/protected/teacher/assignment",
    },
  },
];

const studentItems: Item[] = [
  {
    id: "student-classroom",
    title: "Sınıfımı nerede görebilirim?",
    summary:
      "Hangi sınıfa kayıtlı olduğunuzu ve sınıf adını Classroom sayfasından görüntüleyebilirsiniz.",
    steps: [
      "Menüde Student > Classroom seçeneğine tıklayın.",
      "Tabloda kayıtlı olduğunuz sınıf(lar) listelenir.",
      "Arama ile sınıf adını hızlıca filtreleyebilirsiniz.",
    ],
    cta: { label: "Classroom sayfasına git", href: "/student/classroom" },
  },
  {
    id: "student-assignments",
    title: "Ödevlerimi nasıl görürüm?",
    summary:
      "Sınıfınıza tanımlanmış tüm ödevleri görev, ders, öğretmen ve teslim tarihiyle birlikte görüntüleyin.",
    steps: [
      "Menüde Student > Assignments seçeneğine tıklayın.",
      "Tabloda ödev adı, ders, sınıf, deadline ve öğretmen bilgilerini inceleyin.",
      "Arama kutusuyla ders veya görev adına göre filtreleyin.",
    ],
    cta: { label: "Assignments sayfasına git", href: "/student/assignments" },
  },
  {
    id: "student-schedule",
    title: "Ders programım nerede?",
    summary:
      "Sınıfınıza ait planlanmış derslerin tarih ve saat bilgilerini Schedule ekranından takip edin.",
    steps: [
      "Menüde Student > Schedule seçeneğine tıklayın.",
      "Ders, sınıf, tarih, saat ve öğretmen bilgilerini tablo halinde görün.",
      "Arama ile ders veya sınıf adına göre filtreleyin.",
    ],
    cta: { label: "Schedule sayfasına git", href: "/student/schedule" },
  },
];

const teacherItems: Item[] = [
  {
    id: "teacher-classroom",
    title: "Sorumlu olduğum sınıfları nerede görürüm?",
    summary:
      "Ders girdiğiniz sınıfları ve öğrencilerini Classroom ekranından inceleyin.",
    steps: [
      "Menüden Academy > Classroom (Teacher) seçeneğine tıklayın.",
      "Sınıf adı, kapasite ve kayıtlı öğrencileri listede görün.",
      "Arama ile sınıf adına göre filtreleyin.",
    ],
    cta: { label: "Classroom sayfasına git", href: "/teacher/classroom" },
  },
  {
    id: "teacher-schedule",
    title: "Ders programımı nasıl görüntülerim?",
    summary:
      "Size atanmış derslerin tarih/saat ve sınıf bilgilerini Schedule ekranından kontrol edin.",
    steps: [
      "Menüden Academy > Schedule seçeneğine tıklayın.",
      "Ders, sınıf, tarih ve saat bilgilerini tablo halinde inceleyin.",
      "Arama ile ders veya sınıf adına göre filtreleyin; sayfalama ile listede gezinin.",
    ],
    cta: { label: "Schedule sayfasına git", href: "/teacher/schedule" },
  },
  {
    id: "teacher-assignments",
    title: "Ödev ekleme ve yönetme nasıl yapılır?",
    summary:
      "Sınıflarınıza ödev tanımlayın, dosya yükleyin ve teslim tarihini ayarlayın.",
    steps: [
      "Menüden Academy > Assignments seçeneğine tıklayın.",
      "Add butonuyla modalı açın, görev adı, ders, sınıf, deadline ve dosyayı ekleyin.",
      "Save Changes ile kaydedin; mevcut ödevleri tabloda görebilirsiniz.",
    ],
    cta: { label: "Assignments sayfasına git", href: "/teacher/assignment" },
  },
];

const unknownItems: Item[] = [
  {
    id: "unknown-register",
    title: "Sisteme nasıl kayıt olabilirim?",
    summary:
      "Hesabınız yoksa kayıt için yöneticinizle iletişime geçin veya kayıt formunu doldurun.",
    steps: [
      "Giriş ekranındaki kayıt talebi veya iletişim linkine tıklayın.",
      "Ad, e-posta ve rol bilgilerinizi iletin.",
      "Yönetici hesabınızı onayladığında giriş yapabilirsiniz.",
    ],
    cta: { label: "İletişime geç", href: "/feedbacks" },
  },
  {
    id: "unknown-support",
    title: "Kayıt sürecinde destek nasıl alırım?",
    summary:
      "Kayıt veya erişimle ilgili sorunlarda destek ekibine veya yöneticiye mesaj bırakın.",
    steps: [
      "Feedbacks sayfasından mesajınızı iletin.",
      "E-postanızı kontrol edin; yanıt geldiğinde yönlendirmeleri uygulayın.",
      "Gerekirse tekrar yazın; süreç tamamlanana kadar destek verilir.",
    ],
    cta: { label: "Feedbacks sayfasına git", href: "/feedbacks" },
  },
];

const HelpPage = () => {
  const role = useCurrentRole();
  const list = useMemo(() => {
    if (role === UserRole.STUDENT) return studentItems;
    if (role === UserRole.TEACHER) return teacherItems;
    if (role === UserRole.UNKNOW) return unknownItems;
    return items;
  }, [role]);

  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);

  useEffect(() => {
    setOpenId(list[0]?.id ?? null);
  }, [list]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="surface-panel rounded-3xl px-6 py-6 sm:px-8">
      <div className="mx-auto flex w-full flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
            Yardım & Dokümantasyon
          </p>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            Sık Sorulan İşlemler
          </h1>
          <p className="max-w-3xl text-[var(--text-muted)]">
            Aşağıdaki akordiyon listeden ihtiyacınız olan adımı açın. Her başlık
            altında özet, adım adım yapılacaklar ve ilgili sayfaya hızlı erişim
            bağlantısı bulunur.
          </p>
        </header>

        <div className="space-y-3">
          {list.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/80 shadow-[0_18px_60px_-30px_rgba(20,24,36,0.12)] backdrop-blur transition hover:border-[var(--border-strong)] dark:border-white/10 dark:bg-white/5"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {item.summary}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--accent-soft)] p-2 text-[var(--accent)]">
                    {isOpen ? (
                      <FiChevronUp className="h-5 w-5" />
                    ) : (
                      <FiChevronDown className="h-5 w-5" />
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-[var(--border)] px-5 py-4 text-sm text-[var(--text-primary)] dark:border-white/10">
                    <ul className="mb-4 list-disc space-y-1 pl-5 text-[var(--text-muted)]">
                      {item.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>
                    {item.cta && (
                      <a
                        href={item.cta.href}
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                      >
                        {item.cta.label}
                        <FiExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
