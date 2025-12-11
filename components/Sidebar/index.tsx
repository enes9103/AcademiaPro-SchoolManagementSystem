"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SIDEBAR_ITEMS } from "@/constants/index";
import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import SideBarMenuGroup from "./SidebarGroup";
import { FiChevronLeft } from "react-icons/fi";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { toggleCollapse } = useSideBarToggle();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`surface-panel absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-5 lg:py-4 lg:px-2 mb-4 lg:mb-10">
        <Link
          href="/home"
          className="flex items-center gap-3 text-[var(--text-primary)]"
        >
          <Image
            width={160}
            height={60}
            src="/AcademiaPro-logo.png"
            alt="Logo"
            priority
            className="h-12 lg:h-16 w-auto dark:hidden"
          />
          <Image
            width={160}
            height={60}
            src="/AcademiaPro-logo-dark.png"
            alt="Logo"
            priority
            className="hidden h-12 lg:h-16 w-auto dark:block"
          />
        </Link>

        <button
          ref={trigger}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={sidebarOpen}
        className="block rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)] shadow lg:hidden"
      >
          <FiChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto px-2 pb-6 duration-300 ease-linear">
        {SIDEBAR_ITEMS.map((item, idx) => {
          return <SideBarMenuGroup key={idx} menuGroup={item} />;
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
