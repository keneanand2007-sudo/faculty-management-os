import { useState } from "react";
import { Clock, MapPin, User, BookOpen } from "lucide-react";
import { useTimetable } from "../context/TimetableContext";
import { useFaculty } from "../context/FacultyContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const typeColor = {
  Theory: "bg-brand-50 text-brand-600",
  Practical: "bg-emerald-50 text-emerald-600",
};

export default function Timetable() {
  const { schedule } = useTimetable();
  const { faculty } = useFaculty();
  const [activeDay, setActiveDay] = useState("Monday");

  const getFacultyName = (id) => faculty.find((f) => f.id === id)?.name || "—";

  const dayPeriods = schedule
    .filter((s) => s.day === activeDay)
    .sort((a, b) => a.period.localeCompare(b.period, undefined, { numeric: true }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Weekly Timetable</h1>
        <p className="text-slate-400 text-sm">BCA-II (Sem III) • Room 402 • w.e.f. 21/07/2026</p>
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

      {dayPeriods.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Periods Scheduled</p>
          <p className="text-slate-400 text-sm mt-1">Nothing added for {activeDay} yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayPeriods.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center w-20 h-16 bg-slate-50 rounded-xl text-slate-500 shrink-0">
                  <Clock size={16} />
                  <span className="text-xs font-semibold mt-1">P{p.period}</span>
                </div>

                {p.type === "special" ? (
                  <div className="flex-1 flex items-center">
                    <p className="font-semibold text-slate-500">{p.label}</p>
                    <span className="text-xs text-slate-400 ml-3">{p.time}</span>
                  </div>
                ) : (
                  <div className="flex-1 space-y-2">
                    {p.sessions.map((s, i) => (
                      <div key={i} className={`flex items-center justify-between rounded-xl px-3 py-2 ${p.sessions.length > 1 ? "bg-slate-50" : ""}`}>
                        <div>
                          <p className="font-semibold text-slate-800 flex items-center gap-2">
                            <BookOpen size={14} className="text-slate-400" />
                            {s.subject}
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${typeColor[s.subjectType]}`}>
                              {s.subjectType}
                            </span>
                          </p>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            <User size={11} /> {getFacultyName(s.facultyId)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> Room 402 • {p.time}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
