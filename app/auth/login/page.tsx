import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-sky-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 -top-24 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.1),transparent_30%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center px-6 py-10 lg:px-10">
        <div className="grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              SchoolOS Portal
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Tüm okul verilerinizi tek bir panodan yönetin.
              </h1>
              <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
                Ders programı, ödev, öğrenci ve öğretmen yönetimini merkezi bir
                panelden takip edin. Modern, hızlı ve 7/24 erişilebilir.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs text-slate-300">Öğrenci takibi</p>
                <p className="text-2xl font-semibold text-white">Canlı</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs text-slate-300">Ödev yönetimi</p>
                <p className="text-2xl font-semibold text-white">Gerçek zamanlı</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs text-slate-300">Rol bazlı erişim</p>
                <p className="text-2xl font-semibold text-white">Esnek</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
