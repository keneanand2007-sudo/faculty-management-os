import { BookOpen, CalendarDays, ClipboardCheck, Target } from "lucide-react";
import StatCard from "../components/StatCard";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useFaculty } from "../context/FacultyContext";
import { useSubjects } from "../context/SubjectContext";
import { useActivities } from "../context/ActivityContext";
import { useTimetable } from "../context/TimetableContext";
import { useLeaves } from "../context/LeaveContext";

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function FacultyDashboard() {
  const { currentFacultyId } = useCurrentUser();
  const { faculty } = useFaculty();
  const { subjects } = useSubjects();
  const { activities } = useActivities();
  const { schedule } = useTimetable();
  const { leaves } = useLeaves();

  const me = faculty.find((f) => f.id === currentFacultyId);
  const mySubjects = subjects.filter((s) => s.facultyId === currentFacultyId);
  const myActivities = activities.filter((a) => a.facultyId === currentFacultyId);
  const pendingTasks = myActivities.filter((a) => a.status !== "Completed").length;

  const todayPeriods = schedule
    .filter((s) => s.day === today && s.type === "class" && s.sessions.some((sess) => sess.facultyId === currentFacultyId))
    .sort((a, b) => a.period.localeCompare(b.period, undefined, { numeric: true }));

  const pendingLeave = leaves.filter((l) => l.facultyId === currentFacultyId && l.status === "Pending").length;

  if (!me) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome, {me.name}</h1>
        <p className="text-slate-400 text-sm">{today} • Here's your schedule and activity overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="My Subjects" value={mySubjects.length} color="indigo" />
        <StatCard icon={CalendarDays} label="Classes Today" value={todayPeriods.length} color="green" />
        <StatCard icon={ClipboardCheck} label="My Attendance" value={`${me.attendance}%`} color="amber" />
        <StatCard icon={Target} label="Pending Tasks" value={pendingTasks} color="rose" />
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Today's Timetable ({today})</h3>
        {todayPeriods.length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center">No classes scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todayPeriods.map((p) => {
              const mySession = p.sessions.find((s) => s.facultyId === currentFacultyId);
              return (
                <div key={p.id} className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{mySession.subject}</p>
                    <p className="text-xs text-slate-400">{mySession.subjectType} • Room 402</p>
                  </div>
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                    {p.time}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {pendingLeave > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-700">
          You have {pendingLeave} leave request pending HOD approval.
        </div>
      )}
    </div>
  );
}
