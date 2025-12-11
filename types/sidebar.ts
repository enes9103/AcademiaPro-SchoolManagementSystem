import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";

export type SideNavItem = {
  allowedRole: UserRole[];
  allowedStatus: UserStatus[];
  title: string;
  i18nKey?: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  i18nKey?: string;
  allowedRole: UserRole[];
  allowedStatus: UserStatus[];
  menuList: SideNavItem[];
};
