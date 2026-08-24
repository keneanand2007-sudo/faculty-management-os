import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList, CalendarClock, CalendarDays, Trophy, ClipboardCheck, FileClock, FileBarChart, PieChart, LogOut } from "lucide-react";

const hodLinks = [
  { to: "/hod", label: "Dashboard", icon: LayoutDashboard },
  { to: "/hod/faculty", label: "Faculty", icon: Users },
  { to: "/hod/classes", label: "Classes", icon: GraduationCap },
  { to: "/hod/subjects", label: "Subjects", icon: BookOpen },
  { to: "/hod/activities", label: "Activities", icon: ClipboardList },
  { to: "/hod/timetable", label: "Timetable", icon: CalendarClock },
  { to: "/hod/events", label: "Events & Calendar", icon: CalendarDays },
  { to: "/hod/competitions", label: "Competitions", icon: Trophy },
  { to: "/hod/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/hod/leave", label: "Leaves", icon: FileClock },
  { to: "/hod/reports", label: "Reports", icon: FileBarChart },
  { to: "/hod/analytics", label: "Analytics", icon: PieChart },
];

const facultyLinks = [
  { to: "/faculty", label: "Dashboard", icon: LayoutDashboard },
  { to: "/faculty/subjects", label: "My Subjects", icon: BookOpen },
  { to: "/faculty/activities", label: "My Activities", icon: ClipboardList },
  { to: "/faculty/timetable", label: "Timetable", icon: CalendarClock },
  { to: "/faculty/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/faculty/leave", label: "Leave", icon: FileClock },
];

export default function Sidebar({ role = "hod" }) {
  const links = role === "hod" ? hodLinks : facultyLinks;
  const navigate = useNavigate();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 fixed left-0 top-0 px-4 py-6 border-r border-slate-800/50">
      <div className="flex items-center gap-2 px-2 mb-10">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center font-bold text-white shadow-lg shadow-brand-900/50">
          F
        </div>
        <span className="text-white font-semibold text-lg">FacultyMS</span>
      </div>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-md shadow-brand-900/40"
                  : "hover:bg-slate-800/70 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800/70 hover:text-white transition-colors"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
