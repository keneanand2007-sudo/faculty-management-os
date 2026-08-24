import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, UserCog, ArrowLeft } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import { useCurrentUser } from "../context/CurrentUserContext";

export default function Login() {
  const [step, setStep] = useState("role"); // "role" | "pickFaculty"
  const { faculty } = useFaculty();
  const { setCurrentFacultyId } = useCurrentUser();
  const navigate = useNavigate();

  const handleHOD = () => navigate("/hod");

  const handlePickFaculty = (id) => {
    setCurrentFacultyId(id);
    navigate("/faculty");
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

        <div className="p-10 flex flex-col justify-center">
          {step === "role" && (
            <>
              <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
              <p className="text-slate-400 text-sm mt-1 mb-8">Select how you'd like to continue</p>

              <div className="space-y-4">
                <button
                  onClick={handleHOD}
                  className="w-full flex items-center gap-4 border-2 border-slate-100 hover:border-brand-400 hover:bg-brand-50/40 rounded-2xl p-5 text-left transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <UserCog size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Continue as HOD</p>
                    <p className="text-xs text-slate-400">Full access to faculty, academics and reports</p>
                  </div>
                </button>

                <button
                  onClick={() => setStep("pickFaculty")}
                  className="w-full flex items-center gap-4 border-2 border-slate-100 hover:border-brand-400 hover:bg-brand-50/40 rounded-2xl p-5 text-left transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Users size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Continue as Faculty</p>
                    <p className="text-xs text-slate-400">Access your own classes, subjects and schedule</p>
                  </div>
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-8 text-center">Demo mode — no password required</p>
            </>
          )}

          {step === "pickFaculty" && (
            <>
              <button
                onClick={() => setStep("role")}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-medium mb-4 w-fit"
              >
                <ArrowLeft size={15} /> Back
              </button>
              <h2 className="text-2xl font-bold text-slate-800">Select your profile</h2>
              <p className="text-slate-400 text-sm mt-1 mb-6">Choose which faculty account to continue as</p>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {faculty
                  .filter((f) => f.designation !== "HOD")
                  .map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handlePickFaculty(f.id)}
                      className="w-full flex items-center gap-3 border border-slate-100 hover:border-brand-300 hover:bg-brand-50/40 rounded-xl px-4 py-3 text-left transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-semibold shrink-0">
                        {f.photo}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                        <p className="text-xs text-slate-400">{f.designation}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
