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
  const mySubjectIds = mySubjects.map((s) => s.id);
  const todaySchedule = schedule
    .filter((s) => s.day === today && mySubjectIds.includes(s.subjectId))
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
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
        <StatCard icon={CalendarDays} label="Classes Today" value={todaySchedule.length} color="green" />
        <StatCard icon={ClipboardCheck} label="My Attendance" value={`${me.attendance}%`} color="amber" />
        <StatCard icon={Target} label="Pending Tasks" value={pendingTasks} color="rose" />
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-4">Today's Timetable ({today})</h3>
        {todaySchedule.length === 0 ? (
          <p className="text-slate-400 text-sm py-4 text-center">No classes scheduled for today.</p>
        ) : (
          <div className="space-y-3">
            {todaySchedule.map((t) => {
              const subj = mySubjects.find((s) => s.id === t.subjectId);
              return (
                <div key={t.id} className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{subj?.name}</p>
                    <p className="text-xs text-slate-400">{subj?.className} • Room {t.room}</p>
                  </div>
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full">
                    {t.startTime} - {t.endTime}
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
