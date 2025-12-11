"use client";
import { SideNavItem } from "@/types/sidebar";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
export const SidebarItems = ({ item }: { item: SideNavItem }) => {
  const { toggleCollapse } = useSideBarToggle();
  const role = useCurrentRole();
  const pathname = usePathname();
  const { t } = useTranslation();

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const inactiveLink = classNames("py-2 pl-1", {
    ["justify-start"]: toggleCollapse,
  });

  const activeLink =
    "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text-primary)] shadow-lg";

  const navMenuDropdownItem =
    "border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)] rounded-xl";

  // Memeriksa apakah role termasuk dalam allowedRole
  if (!role || !item.allowedRole.includes(role)) {
    return null;
  }
  return (
    <>
      {item.submenu ? (
        <div>
          <button
            className="w-[17rem] group relative my-2 flex items-center gap-2.5 rounded-xl border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            onClick={toggleSubMenu}
          >
            <div>{item.icon}</div>
            {!toggleCollapse && (
              <>
                <span className="ml-3 text-base leading-6 font-semibold">
                  {t(item.i18nKey ?? item.title)}
                </span>
                <FiChevronRight
                  className={`${subMenuOpen ? "rotate-90" : ""} ml-auto h-4 w-4 text-[var(--text-primary)] transition`}
                />
              </>
            )}
          </button>
          {subMenuOpen && !toggleCollapse && (
            <div>
              <div className="ml-3 mr-3 grid gap-y-2 rounded-2xl border-[var(--border)] bg-[var(--surface)] px-4 py-4 leading-5 text-[var(--text-primary)] transition">
                {item.subMenuItems?.map((subItem, idx) => (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${navMenuDropdownItem} ${
                      subItem.path === pathname ? activeLink : ""
                    }`}
                  >
                    <button
                    className={`${
                      subItem.path === pathname
                        ? "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 font-semibold text-[var(--text-primary)]"
                        : "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium text-[var(--text-primary)] duration-300 ease-in-out"
                    }`}
                  >
                    <div>{subItem.icon}</div>
                    {!toggleCollapse && (
                      <span className="ml-3 w-200 leading-6 font-semibold">
                        {t(subItem.i18nKey ?? subItem.title)}
                      </span>
                    )}
                  </button>
                </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`${inactiveLink} ${item.path === pathname ? "active" : ""}`}
        >
          <button
            className={`${
              item.path === pathname
                ? `w-[17rem] group relative my-1 flex items-center gap-2.5 rounded-xl px-4 py-3 font-semibold ${activeLink}`
                : "w-[17rem] group relative my-1 flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            }`}
          >
            <div className="min-w-[20px]">{item.icon}</div>
            {!toggleCollapse && (
              <span className="ml-3 w-200 leading-6 font-semibold">
                {t(item.i18nKey ?? item.title)}
              </span>
            )}
          </button>
        </Link>
      )}
    </>
  );
};
