import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Lock, User } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("hod");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(role === "hod" ? "/hod" : "/faculty");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center bg-slate-900 text-white p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"></div>
          <GraduationCap size={40} className="mb-6 text-brand-400" />
          <h1 className="text-3xl font-bold leading-tight">Faculty Management System</h1>
          <p className="text-slate-400 mt-3 text-sm">
            Centralized platform to manage faculty, classes, events, competitions and performance.
          </p>
        </div>

        <div className="p-10">
          <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1 mb-6">Login to continue to your dashboard</p>

          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl">
            {["hod", "faculty"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                  role === r ? "bg-white shadow text-brand-600" : "text-slate-500"
                }`}
              >
                {r === "hod" ? "HOD" : "Faculty"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-brand-500">
              <User size={18} className="text-slate-400" />
              <input type="text" placeholder="User ID" required className="outline-none text-sm w-full" />
            </div>
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-brand-500">
              <Lock size={18} className="text-slate-400" />
              <input type="password" placeholder="Password" required className="outline-none text-sm w-full" />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
            >
              Login as {role === "hod" ? "HOD" : "Faculty"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
