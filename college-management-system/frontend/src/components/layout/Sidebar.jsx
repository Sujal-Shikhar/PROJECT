import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  FileText,
  Calendar,
  IndianRupee,
  Briefcase,
  Bell,
  LogOut,
} from "lucide-react";
import {
  ClipboardList,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const menus = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Students",
    icon: GraduationCap,
    path: "/students",
  },
  {
    title: "Faculty",
    icon: Users,
    path: "/faculty",
  },
  {
    title: "Subjects",
    icon: BookOpen,
    path: "/subjects",
  },
  {
    title: "Attendance",
    icon: ClipboardCheck,
    path: "/attendance",
  },
  {
    title: "Exams",
    icon: ClipboardList,
    path: "/exams",
  },
  {
  title: "Results",
  icon: FileText,
  path: "/results",
},
{
  title: "Internal Marks",
  icon: ClipboardList,
  path: "/internal-marks",
},
  {
    title: "Fees",
    icon: IndianRupee,
    path: "/fees",
  },
  {
    title: "Placements",
    icon: Briefcase,
    path: "/placements",
  },
  {
    title: "Timetable",
    icon: Calendar,
    path: "/timetable",
  },
  {
    title: "Notices",
    icon: Bell,
    path: "/notices",
  },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        CMS
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600"
                    : "hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {menu.title}
            </NavLink>
          );
        })}

      </nav>

      <button
        onClick={logout}
        className="m-4 flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg"
      >
        <LogOut size={20} />
        Logout
      </button>

    </aside>
  );
}