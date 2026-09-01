import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, UserPlus, Upload } from "lucide-react";
import { classesList } from "../data/mockData";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";
import { useStudents } from "../context/StudentContext";
import { useAttendance } from "../context/AttendanceContext";
import AddStudentModal from "../components/AddStudentModal";
import ImportStudentsModal from "../components/ImportStudentsModal";

const statusColors = {
  "Not Started": "bg-slate-100 text-slate-500",
  "In Progress": "bg-amber-50 text-amber-600",
  "Completed": "bg-emerald-50 text-emerald-600",
};

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subjects } = useSubjects();
  const { faculty } = useFaculty();
  const { students } = useStudents();
  const { getStudentPercentage } = useAttendance();
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showImport, setShowImport] = useState(false);

  const cls = classesList.find((c) => c.id === id);

  if (!cls) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Class not found.</p>
        <button onClick={() => navigate("/hod/classes")} className="text-brand-600 text-sm mt-2">
          Back to Classes
        </button>
      </div>
    );
  }

  const classStudents = students.filter((s) => s.className === cls.name);
  const classSubjects = subjects.filter((s) => s.className === cls.name);
  const coordinator = faculty.find((f) => f.id === cls.coordinatorFacultyId);
  const getFacultyName = (fid) => faculty.find((f) => f.id === fid)?.name || "Unassigned";

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/hod/classes")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Classes
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h1 className="text-xl font-bold text-slate-800">{cls.name} - {cls.division}</h1>
        <p className="text-slate-400 text-sm mt-1">Semester {cls.semester} • {classStudents.length} students • {classSubjects.length} subjects</p>

        {coordinator && (
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-50">
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-semibold">
              {coordinator.photo}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{coordinator.name}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Mail size={11} /> {coordinator.email} • Class Coordinator
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Subjects</h3>
          <div className="space-y-3">
            {classSubjects.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{s.name}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <User size={11} /> {getFacultyName(s.facultyId)}
                  </p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[s.syllabusStatus]}`}>
                  {s.syllabusStatus}
                </span>
              </div>
            ))}
            {classSubjects.length === 0 && <p className="text-slate-400 text-sm py-4 text-center">No subjects yet.</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Students</h3>
            <div className="flex gap-2">
              <button onClick={() => setShowImport(true)} className="text-slate-400 hover:text-brand-600" title="Import from Excel">
                <Upload size={16} />
              </button>
              <button onClick={() => setShowAddStudent(true)} className="text-slate-400 hover:text-brand-600" title="Add Student">
                <UserPlus size={16} />
              </button>
            </div>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {classStudents.map((s) => {
              const pct = getStudentPercentage(s.id);
              return (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-400 w-6">{s.rollNo}</span>
                    <p className="text-sm text-slate-800">{s.name}</p>
                  </div>
                  <span className={`text-xs font-medium ${pct < 75 ? "text-rose-500" : "text-slate-400"}`}>{pct}%</span>
                </div>
              );
            })}
            {classStudents.length === 0 && (
              <div className="text-center py-6">
                <p className="text-slate-400 text-sm">No students yet.</p>
                <button onClick={() => setShowAddStudent(true)} className="text-brand-600 text-sm font-medium mt-2">
                  Add your first student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddStudent && <AddStudentModal defaultClass={cls.name} onClose={() => setShowAddStudent(false)} />}
      {showImport && <ImportStudentsModal defaultClass={cls.name} onClose={() => setShowImport(false)} />}
    </div>
  );
}
