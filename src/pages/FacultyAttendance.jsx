import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Save } from "lucide-react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useAttendance } from "../context/AttendanceContext";
import { useSubjects } from "../context/SubjectContext";

export default function FacultyAttendance() {
  const { currentFacultyId } = useCurrentUser();
  const { students, saveAttendance, getRecord } = useAttendance();
  const { subjects } = useSubjects();

  const mySubjects = subjects.filter((s) => s.facultyId === currentFacultyId);
  const [selectedSubject, setSelectedSubject] = useState(mySubjects[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({});
  const [saved, setSaved] = useState(false);

  const activeSubject = mySubjects.find((s) => s.id === selectedSubject);
  const classStudents = students.filter((s) => s.className === activeSubject?.className);

  useEffect(() => {
    if (!selectedSubject || !activeSubject) return;
    const existing = getRecord(selectedDate, selectedSubject, activeSubject.className);
    const map = {};
    classStudents.forEach((s) => {
      const found = existing?.entries.find((e) => e.studentId === s.id);
      map[s.id] = found?.status || "Present";
    });
    setStatusMap(map);
    setSaved(false);
  }, [selectedSubject, selectedDate]);

  const toggleStatus = (studentId) => {
    setStatusMap({ ...statusMap, [studentId]: statusMap[studentId] === "Present" ? "Absent" : "Present" });
    setSaved(false);
  };

  const handleSave = () => {
    const entries = classStudents.map((s) => ({ studentId: s.id, status: statusMap[s.id] || "Present" }));
    saveAttendance(selectedDate, selectedSubject, activeSubject.className, entries);
    setSaved(true);
  };

  if (mySubjects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
        <p className="font-semibold text-slate-700">No Subjects Assigned</p>
        <p className="text-slate-400 text-sm mt-1">You need subjects assigned to mark attendance.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mark Attendance</h1>
        <p className="text-slate-400 text-sm">Mark attendance for your classes</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <div>
            <label className="text-xs font-medium text-slate-500">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {mySubjects.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.className})</option>)}
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

        <h3 className="font-semibold text-slate-800 mb-3">Student List — {activeSubject?.className}</h3>
        <div className="space-y-2">
          {classStudents.map((s) => {
            const status = statusMap[s.id] || "Present";
            return (
              <div key={s.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400 w-6">{s.rollNo}</span>
                  <p className="text-sm font-medium text-slate-800">{s.name}</p>
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
        </div>

        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-5"
        >
          <Save size={16} />
          {saved ? "Attendance Saved ✓" : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}
