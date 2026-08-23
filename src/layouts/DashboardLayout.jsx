import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ role }) {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-br from-brand-100/70 via-slate-50 to-sky-100/60"></div>
      <div className="pointer-events-none fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-300/40 rounded-full blur-[120px]"></div>
      <div className="pointer-events-none fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-[120px]"></div>
      <div className="pointer-events-none fixed top-[40%] right-[30%] w-[350px] h-[350px] bg-rose-200/25 rounded-full blur-[100px]"></div>

      <Sidebar role={role} />
      <div className="relative md:ml-64">
        <Navbar role={role === "hod" ? "HOD" : "Faculty"} />
        <main className="p-6 relative z-[1]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
