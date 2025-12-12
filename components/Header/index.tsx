import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { FiMenu } from "react-icons/fi";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-[var(--border-strong)] bg-[var(--surface-strong)] backdrop-blur-xl">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-8 text-[var(--text-primary)]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-4 sm:gap-4 lg:hidden">
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block items-center rounded-lg border border-slate-300/80 bg-white/80 p-2 text-slate-900 shadow dark:border-white/15 dark:bg-white/10 dark:text-white lg:hidden"
            >
              <FiMenu className="h-6 w-6" />
            </button>

            <Link className="block flex-shrink-0 lg:hidden" href="/">
              <Image
                width={120}
                height={28}
                src="/AcademiaPro-logo-sm.png"
                alt="Logo"
                className="h-10 w-auto dark:hidden"
              />
              <Image
                width={120}
                height={28}
                src="/AcademiaPro-logo-sm-dark.png"
                alt="Logo"
                className="hidden h-10 w-auto dark:block"
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-5">
          <DarkModeSwitcher />
          <LanguageSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
