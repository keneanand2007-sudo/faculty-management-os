import { useState } from "react";
import { Users, ClipboardCheck, BarChart3, CalendarDays, Trophy, Printer } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import { useSubjects } from "../context/SubjectContext";
import { useAttendance } from "../context/AttendanceContext";
import { useStudents } from "../context/StudentContext";
import { useEvents } from "../context/EventContext";
import { useCompetitions } from "../context/CompetitionContext";

const reportTypes = [
  { id: "faculty", label: "Faculty Report", icon: Users, color: "bg-brand-50 text-brand-600" },
  { id: "attendance", label: "Attendance Report", icon: ClipboardCheck, color: "bg-emerald-50 text-emerald-600" },
  { id: "workload", label: "Workload Report", icon: BarChart3, color: "bg-amber-50 text-amber-600" },
  { id: "event", label: "Event Report", icon: CalendarDays, color: "bg-sky-50 text-sky-600" },
  { id: "competition", label: "Competition Report", icon: Trophy, color: "bg-rose-50 text-rose-600" },
];

export default function Reports() {
  const [selected, setSelected] = useState(null);
  const { faculty } = useFaculty();
  const { getStudentPercentage } = useAttendance();
  const { students } = useStudents();
  const { events } = useEvents();
  const { competitions } = useCompetitions();

  const today = new Date().toLocaleDateString("en-GB");

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      <div className="no-print">
        <h1 className="text-2xl font-bold text-slate-800">Reports</h1>
        <p className="text-slate-400 text-sm">Generate and print academic reports</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 no-print">
        {reportTypes.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`bg-white rounded-2xl p-5 border shadow-sm text-left transition-all ${
                selected === r.id ? "border-brand-400 ring-2 ring-brand-100" : "border-slate-100"
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${r.color}`}>
                <Icon size={20} />
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-3">{r.label}</p>
            </button>
          );
        })}
      </div>

      {!selected && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center no-print">
          <p className="font-semibold text-slate-700">Select a Report Type</p>
          <p className="text-slate-400 text-sm mt-1">Choose a report above to generate a preview.</p>
        </div>
      )}

      {selected && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 print-area">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-800">{reportTypes.find((r) => r.id === selected)?.label}</h2>
              <p className="text-xs text-slate-400">Generated on {today} • Faculty Management System</p>
            </div>
            <button
              onClick={handlePrint}
              className="no-print flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Printer size={16} /> Print / Export PDF
            </button>
          </div>

          {selected === "faculty" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Designation</th>
                  <th className="py-2 pr-4">Subjects</th>
                  <th className="py-2 pr-4">Classes</th>
                  <th className="py-2 pr-4">Workload</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="border-b border-slate-50">
                    <td className="py-2.5 pr-4 text-slate-500">{f.id}</td>
                    <td className="py-2.5 pr-4 font-medium text-slate-800">{f.name}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.designation}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.subjects}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.classes}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.workload} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selected === "attendance" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-2 pr-4">Roll No</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Class</th>
                  <th className="py-2 pr-4">Overall %</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const pct = getStudentPercentage(s.id);
                  return (
                    <tr key={s.id} className="border-b border-slate-50">
                      <td className="py-2.5 pr-4 text-slate-500">{s.rollNo}</td>
                      <td className="py-2.5 pr-4 font-medium text-slate-800">{s.name}</td>
                      <td className="py-2.5 pr-4 text-slate-600">{s.className}</td>
                      <td className="py-2.5 pr-4 text-slate-600">{pct}%</td>
                      <td className="py-2.5 pr-4">
                        <span className={pct < 75 ? "text-rose-600 font-medium" : "text-emerald-600 font-medium"}>
                          {pct < 75 ? "Low" : "Good"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {selected === "workload" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Subjects</th>
                  <th className="py-2 pr-4">Classes</th>
                  <th className="py-2 pr-4">Weekly Hours</th>
                  <th className="py-2 pr-4">Load Level</th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="border-b border-slate-50">
                    <td className="py-2.5 pr-4 font-medium text-slate-800">{f.name}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.subjects}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.classes}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{f.workload} hrs</td>
                    <td className="py-2.5 pr-4">
                      <span className={f.workload > 20 ? "text-rose-600 font-medium" : "text-emerald-600 font-medium"}>
                        {f.workload > 20 ? "High" : "Balanced"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selected === "event" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-2 pr-4">Event</th>
                  <th className="py-2 pr-4">Venue</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Budget Used</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-b border-slate-50">
                    <td className="py-2.5 pr-4 font-medium text-slate-800">{e.name}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{e.venue}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{e.startDate}</td>
                    <td className="py-2.5 pr-4 text-slate-600">₹{e.usedBudget.toLocaleString()} / ₹{e.allocatedBudget.toLocaleString()}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selected === "competition" && (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-2 pr-4">Competition</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2 pr-4">Participants</th>
                  <th className="py-2 pr-4">Winners</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {competitions.map((c) => (
                  <tr key={c.id} className="border-b border-slate-50">
                    <td className="py-2.5 pr-4 font-medium text-slate-800">{c.name}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{c.category}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{c.participants.length}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{c.results.filter((r) => r.position === 1).length}</td>
                    <td className="py-2.5 pr-4 text-slate-600">{c.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
