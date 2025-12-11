import { SideNavItemGroup } from "@/types/sidebar";
import { BsEnvelope, BsHouseDoor, BsQuestionCircle } from "react-icons/bs";
import {
  FiUser,
  FiBook,
  FiBarChart2,
  FiGrid,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import { PiCalendarCheck } from "react-icons/pi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSchoolOutline } from "react-icons/io5";
import { LuSchool2 } from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
import { UserRole, UserStatus } from "@prisma/client";

export const SIDEBAR_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    i18nKey: "nav.groups.dashboards",
    allowedRole: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.UNKNOW],
    allowedStatus: [UserStatus.ACTIVE, UserStatus.UNKNOW],
    menuList: [
      {
        allowedRole: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT, UserRole.UNKNOW],
        allowedStatus: [UserStatus.ACTIVE, UserStatus.UNKNOW],
        title: "Dashboard",
        i18nKey: "nav.items.dashboard",
        path: "/home",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    i18nKey: "nav.groups.manage",
    allowedRole: [UserRole.ADMIN],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.ADMIN],
        title: "User",
        i18nKey: "nav.items.user",
        path: "/admin",
        icon: <FiUser size={20} />,
        submenu: true,
        subMenuItems: [
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "User List",
            i18nKey: "nav.items.userList",
            path: "/admin/list/user",
            icon: <HiOutlineUserGroup size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Teacher List",
            i18nKey: "nav.items.teacherList",
            path: "/admin/list/teacher",
            icon: <FiUserCheck size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Student List",
            i18nKey: "nav.items.studentList",
            path: "/admin/list/student",
            icon: <FiUsers size={20} />,
          },
        ],
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.ADMIN],
        title: "Academy",
        i18nKey: "nav.items.academy",
        path: "/admin",
        icon: <IoSchoolOutline size={20} />,
        submenu: true,
        subMenuItems: [
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Class Room",
            i18nKey: "nav.items.classroom",
            path: "/admin/manage/classroom",
            icon: <LuSchool2 size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Lessons",
            i18nKey: "nav.items.lessons",
            path: "/admin/manage/lesson",
            icon: <FiBook size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Schedule",
            i18nKey: "nav.items.schedule",
            path: "/admin/manage/schedule",
            icon: <PiCalendarCheck size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Assignment",
            i18nKey: "nav.items.assignment",
            path: "/admin/manage/assignment",
            icon: <MdOutlineAssignment size={20} />,
          },
        ],
      },
    ],
  },
  {
    title: "Reports",
    i18nKey: "nav.groups.reports",
    allowedRole: [UserRole.ADMIN],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.ADMIN],
        title: "Reports",
        i18nKey: "nav.items.reports",
        path: "/admin/reports",
        icon: <FiBarChart2 size={20} />,
        submenu: true,
        subMenuItems: [
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Classroom Reports",
            i18nKey: "nav.items.classroomReports",
            path: "/admin/reports/classrooms",
            icon: <FiGrid size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Teacher Reports",
            i18nKey: "nav.items.teacherReports",
            path: "/admin/reports/teachers",
            icon: <FiUserCheck size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Student Reports",
            i18nKey: "nav.items.studentReports",
            path: "/admin/reports/students",
            icon: <FiUsers size={20} />,
          },
        ],
      },
    ],
  },
  {
    title: "Academy",
    i18nKey: "nav.groups.academy",
    allowedRole: [UserRole.TEACHER],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.TEACHER],
        title: "Classroom",
        i18nKey: "nav.items.classroom",
        path: "/teacher/classroom",
        icon: <LuSchool2 size={20} />,
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.TEACHER],
        title: "Schedule",
        i18nKey: "nav.items.schedule",
        path: "/teacher/schedule",
        icon: <PiCalendarCheck size={20} />,
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.TEACHER],
        title: "Assignment",
        i18nKey: "nav.items.assignment",
        path: "/teacher/assignment",
        icon: <MdOutlineAssignment size={20} />,
      },
    ],
  },
  {
    title: "Student",
    i18nKey: "nav.groups.student",
    allowedRole: [UserRole.STUDENT],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.STUDENT],
        title: "Classroom",
        i18nKey: "nav.items.classroom",
        path: "/student/classroom",
        icon: <LuSchool2 size={20} />,
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.STUDENT],
        title: "Assignments",
        i18nKey: "nav.items.assignments",
        path: "/student/assignments",
        icon: <MdOutlineAssignment size={20} />,
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.STUDENT],
        title: "Schedule",
        i18nKey: "nav.items.schedule",
        path: "/student/schedule",
        icon: <PiCalendarCheck size={20} />,
      },
    ],
  },
  {
    title: "Others",
    i18nKey: "nav.groups.others",
    allowedRole: [
      UserRole.ADMIN,
      UserRole.TEACHER,
      UserRole.STUDENT,
      UserRole.UNKNOW,
    ],
    allowedStatus: [
      UserStatus.ACTIVE,
      UserStatus.IN_ACTIVE,
      UserStatus.BANNED,
      UserStatus.UNKNOW,
    ],
    menuList: [
      {
        allowedStatus: [
          UserStatus.ACTIVE,
        ],
        allowedRole: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
        title: "Tasks",
        i18nKey: "nav.items.tasks",
        path: "/tasks",
        icon: <FiGrid size={20} />,
      },
      {
        allowedStatus: [
          UserStatus.ACTIVE,
          UserStatus.IN_ACTIVE,
          UserStatus.BANNED,
          UserStatus.UNKNOW,
        ],
        allowedRole: [
          UserRole.ADMIN,
          UserRole.TEACHER,
          UserRole.STUDENT,
          UserRole.UNKNOW,
        ],
        title: "Help",
        i18nKey: "nav.items.help",
        path: "/help",
        icon: <BsQuestionCircle size={20} />,
      },
      {
        allowedStatus: [
          UserStatus.ACTIVE,
          UserStatus.IN_ACTIVE,
          UserStatus.BANNED,
          UserStatus.UNKNOW,
        ],
        allowedRole: [
          UserRole.ADMIN,
          UserRole.TEACHER,
          UserRole.STUDENT,
          UserRole.UNKNOW,
        ],
        title: "Feedbacks",
        i18nKey: "nav.items.feedbacks",
        path: "/feedbacks",
        icon: <BsEnvelope size={20} />,
      },
    ],
  },
];
