import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="surface-panel rounded-3xl px-6 pb-6 pt-5 sm:px-8">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {/* i18next client needed in server: keep static label */}
          Settings
        </p>
        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Account Settings</h1>
        <p className="text-[var(--text-muted)]">
          Adjust your account details and preferences.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Account</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Profile updates are handled on the Profile page.
          </p>
          <a
            href="/profile"
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-95"
          >
            Go to Profile
          </a>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Preferences</h2>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-muted)]">
            <li>Use the header language dropdown to switch languages.</li>
            <li>Use the header theme switch to toggle light/dark mode.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
