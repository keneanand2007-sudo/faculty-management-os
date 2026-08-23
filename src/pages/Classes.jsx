import { useNavigate } from "react-router-dom";
import { Users, BookOpen, User } from "lucide-react";
import { classesList } from "../data/mockData";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";
import { useAttendance } from "../context/AttendanceContext";

export default function Classes() {
  const navigate = useNavigate();
  const { subjects } = useSubjects();
  const { faculty } = useFaculty();
  const { students } = useAttendance();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Classes</h1>
        <p className="text-slate-400 text-sm">{classesList.length} classes</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classesList.map((c) => {
          const classStudents = students.filter((s) => s.className === c.name);
          const classSubjects = subjects.filter((s) => s.className === c.name);
          const coordinator = faculty.find((f) => f.id === c.coordinatorFacultyId);

          return (
            <div
              key={c.id}
              onClick={() => navigate(`/hod/classes/${c.id}`)}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
            >
              <h3 className="font-semibold text-slate-800 text-lg">{c.name} - {c.division}</h3>
              <p className="text-xs text-slate-400">Semester {c.semester}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users size={15} className="text-brand-500" /> {classStudents.length} students
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <BookOpen size={15} className="text-emerald-500" /> {classSubjects.length} subjects
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 text-xs text-slate-500">
                <User size={13} /> Coordinator: {coordinator?.name || "Unassigned"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
