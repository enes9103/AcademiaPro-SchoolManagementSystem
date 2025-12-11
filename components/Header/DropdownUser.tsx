import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoutButton } from "./Logoutbtn";
import { FiChevronDown, FiUser, FiBookOpen, FiSettings } from "react-icons/fi";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useTranslation } from "react-i18next";
const DropdownUser = () => {
  const user = useCurrentUser();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
          <span className="block text-xs">{user?.role}</span>
        </span>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-primary)] border border-graydark dark:border-gray-2">
          <FiUser className="h-6 w-6" />
        </span>

        <FiChevronDown className="hidden text-[var(--text-primary)] sm:block" />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FiUser className="h-5 w-5" />
              {t("header.profile")}
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FiSettings className="h-5 w-5" />
              {t("header.settings")}
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
