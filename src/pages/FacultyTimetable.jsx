import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useTimetable } from "../context/TimetableContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const typeColor = {
  Theory: "bg-brand-50 text-brand-600",
  Practical: "bg-emerald-50 text-emerald-600",
};

export default function FacultyTimetable() {
  const { currentFacultyId } = useCurrentUser();
  const { schedule } = useTimetable();
  const [activeDay, setActiveDay] = useState("Monday");

  const myPeriods = schedule
    .filter((s) => s.day === activeDay && s.type === "class" && s.sessions.some((sess) => sess.facultyId === currentFacultyId))
    .sort((a, b) => a.period.localeCompare(b.period, undefined, { numeric: true }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Timetable</h1>
        <p className="text-slate-400 text-sm">BCA-II (Sem III) • Room 402</p>
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit overflow-x-auto">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDay(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeDay === d ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {d.slice(0, 3)}
          </button>
        ))}
      </div>

      {myPeriods.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Classes</p>
          <p className="text-slate-400 text-sm mt-1">Nothing scheduled for you on {activeDay}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {myPeriods.map((p) => {
            const mySession = p.sessions.find((s) => s.facultyId === currentFacultyId);
            return (
              <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-20 h-16 bg-brand-50 rounded-xl text-brand-600 shrink-0">
                  <Clock size={16} />
                  <span className="text-xs font-semibold mt-1">P{p.period}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 flex items-center gap-2">
                    {mySession.subject}
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColor[mySession.subjectType]}`}>
                      {mySession.subjectType}
                    </span>
                  </p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> Room 402 • {p.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
