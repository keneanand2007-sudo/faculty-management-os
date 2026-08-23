import { Users, BookOpen, CalendarDays, Trophy } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import { useFaculty } from "../context/FacultyContext";
import { useSubjects } from "../context/SubjectContext";
import { useEvents } from "../context/EventContext";
import { attendanceData } from "../data/mockData";

const statusColors = {
  Upcoming: "bg-sky-50 text-sky-600",
  Ongoing: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Scheduled: "bg-sky-50 text-sky-600",
};

export default function HODDashboard() {
  const { faculty } = useFaculty();
  const { subjects } = useSubjects();
  const { events } = useEvents();
  const navigate = useNavigate();
  const workloadData = faculty.map((f) => ({ name: f.name.split(" ").slice(-1)[0], hours: f.workload }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">HOD Dashboard</h1>
        <p className="text-slate-400 text-sm">Overview of faculty, events and performance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Faculty" value={faculty.length} color="indigo" />
        <StatCard icon={BookOpen} label="Total Subjects" value={subjects.length} color="green" />
        <StatCard icon={CalendarDays} label="Total Functions" value={events.length} color="amber" />
        <StatCard icon={Trophy} label="Active Competitions" value="2" color="rose" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Faculty Workload (hrs/week)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={workloadData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="hours" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Weekly Attendance %</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[80, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="present" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Faculty List</h3>
            <button onClick={() => navigate("/hod/faculty")} className="text-xs font-medium text-brand-600">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {faculty.slice(0, 5).map((f) => (
              <div
                key={f.id}
                onClick={() => navigate(`/hod/faculty/${f.id}`)}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-semibold">
                    {f.photo}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.designation}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">{f.workload} hrs</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Upcoming Functions</h3>
            <button onClick={() => navigate("/hod/events")} className="text-xs font-medium text-brand-600">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {events.slice(0, 5).map((e) => (
              <div
                key={e.id}
                onClick={() => navigate(`/hod/events/${e.id}`)}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">{e.name}</p>
                  <p className="text-xs text-slate-400">{e.startDate}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[e.status]}`}>
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
