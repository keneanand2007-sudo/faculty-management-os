import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Save, TrendingDown } from "lucide-react";
import { useAttendance } from "../context/AttendanceContext";
import { useSubjects } from "../context/SubjectContext";
import StatCard from "../components/StatCard";
import { Users, ClipboardCheck } from "lucide-react";

export default function Attendance() {
  const { students, saveAttendance, getRecord, getStudentPercentage } = useAttendance();
  const { subjects } = useSubjects();

  const classes = [...new Set(students.map((s) => s.className))];
  const [selectedClass, setSelectedClass] = useState(classes[0] || "");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({});
  const [saved, setSaved] = useState(false);

  const classSubjects = subjects.filter((s) => s.className === selectedClass);
  const classStudents = students.filter((s) => s.className === selectedClass);

  useEffect(() => {
    if (classSubjects.length > 0 && !classSubjects.find((s) => s.id === selectedSubject)) {
      setSelectedSubject(classSubjects[0].id);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (!selectedSubject) return;
    const existing = getRecord(selectedDate, selectedSubject, selectedClass);
    const map = {};
    classStudents.forEach((s) => {
      const found = existing?.entries.find((e) => e.studentId === s.id);
      map[s.id] = found?.status || "Present";
    });
    setStatusMap(map);
    setSaved(false);
  }, [selectedClass, selectedSubject, selectedDate]);

  const toggleStatus = (studentId) => {
    setStatusMap({ ...statusMap, [studentId]: statusMap[studentId] === "Present" ? "Absent" : "Present" });
    setSaved(false);
  };

  const markAllPresent = () => {
    const map = {};
    classStudents.forEach((s) => (map[s.id] = "Present"));
    setStatusMap(map);
    setSaved(false);
  };

  const handleSave = () => {
    const entries = classStudents.map((s) => ({ studentId: s.id, status: statusMap[s.id] || "Present" }));
    saveAttendance(selectedDate, selectedSubject, selectedClass, entries);
    setSaved(true);
  };

  const presentCount = Object.values(statusMap).filter((s) => s === "Present").length;
  const percentage = classStudents.length > 0 ? Math.round((presentCount / classStudents.length) * 100) : 0;
  const lowAttendance = classStudents.filter((s) => getStudentPercentage(s.id) < 75);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
        <p className="text-slate-400 text-sm">Mark and track student attendance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Today's Attendance" value={`${percentage}%`} color="indigo" />
        <StatCard icon={ClipboardCheck} label="Present" value={presentCount} color="green" />
        <StatCard icon={TrendingDown} label="Low Attendance (<75%)" value={lowAttendance.length} color="rose" />
        <StatCard icon={Users} label="Total Students" value={classStudents.length} color="amber" />
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          <div>
            <label className="text-xs font-medium text-slate-500">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {classes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {classSubjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-slate-500">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-800">Student List</h3>
          <button onClick={markAllPresent} className="text-xs font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg">
            Mark All Present
          </button>
        </div>

        <div className="space-y-2">
          {classStudents.map((s) => {
            const status = statusMap[s.id] || "Present";
            const pct = getStudentPercentage(s.id);
            return (
              <div key={s.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400 w-6">{s.rollNo}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{s.name}</p>
                    <p className={`text-xs ${pct < 75 ? "text-rose-500" : "text-slate-400"}`}>{pct}% overall</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStatus(s.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                    status === "Present" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {status === "Present" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  {status}
                </button>
              </div>
            );
          })}
          {classStudents.length === 0 && (
            <p className="text-slate-400 text-sm py-6 text-center">No students found for this class.</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={classStudents.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors mt-5"
        >
          <Save size={16} />
          {saved ? "Attendance Saved ✓" : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}
