"use client";

import { logout } from "@/actions/logout";
import { FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";

interface LogoutButtonProps {
  children?: React.ReactNode;
};

export const LogoutButton = ({
 children 
}: LogoutButtonProps) => {
  const { t } = useTranslation();
  const onClick = () => {
    logout();
  };

  return (
    <button onClick={onClick} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <FiLogOut className="h-5 w-5" />
          {t("header.logout")}
    </button>
  );
};
