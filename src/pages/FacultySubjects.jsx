import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useSubjects } from "../context/SubjectContext";

const statusColors = {
  "Not Started": "bg-slate-100 text-slate-500",
  "In Progress": "bg-amber-50 text-amber-600",
  "Completed": "bg-emerald-50 text-emerald-600",
};

export default function FacultySubjects() {
  const { currentFacultyId } = useCurrentUser();
  const { subjects } = useSubjects();
  const navigate = useNavigate();
  const mySubjects = subjects.filter((s) => s.facultyId === currentFacultyId);

  const progressOf = (s) => {
    const topics = s.topics || [];
    if (topics.length === 0) return null;
    return Math.round((topics.filter((t) => t.status === "Completed").length / topics.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">My Subjects</h1>
        <p className="text-slate-400 text-sm">{mySubjects.length} subjects assigned to you</p>
      </div>

      {mySubjects.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Subjects Assigned</p>
          <p className="text-slate-400 text-sm mt-1">You don't have any subjects assigned yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mySubjects.map((s) => {
            const pct = progressOf(s);
            return (
              <div
                key={s.id}
                onClick={() => navigate(`/faculty/subjects/${s.id}`)}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-800 leading-tight">{s.name}</h3>
                  {pct === null ? (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[s.syllabusStatus]}`}>
                      {s.syllabusStatus}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-brand-600 ml-2">{pct}%</span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-2">{s.code} • Sem {s.semester}</p>

                {pct !== null && (
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <span className="text-xs text-slate-500">{s.className}</span>
                  <span className="text-xs font-medium text-slate-500">{s.totalHours} hrs</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
