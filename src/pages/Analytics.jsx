import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useFaculty } from "../context/FacultyContext";
import { useSubjects } from "../context/SubjectContext";
import { useEvents } from "../context/EventContext";
import { useCompetitions } from "../context/CompetitionContext";
import StatCard from "../components/StatCard";
import { BarChart3, BookOpen, CalendarDays, Trophy } from "lucide-react";

const tabs = ["Faculty", "Academic", "Events", "Competitions"];
const PIE_COLORS = ["#7c3aed", "#a78bfa", "#c4b5fd", "#f59e0b", "#10b981", "#f43f5e"];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("Faculty");
  const { faculty } = useFaculty();
  const { subjects } = useSubjects();
  const { events } = useEvents();
  const { competitions } = useCompetitions();

  const workloadData = faculty.map((f) => ({ name: f.name.split(" ").slice(-1)[0], hours: f.workload }));
  const subjectsPerFaculty = faculty.map((f) => ({
    name: f.name.split(" ").slice(-1)[0],
    subjects: subjects.filter((s) => s.facultyId === f.id).length,
  }));

  const syllabusStatusCount = ["Not Started", "In Progress", "Completed"].map((status) => ({
    name: status,
    value: subjects.filter((s) => s.syllabusStatus === status).length,
  })).filter((d) => d.value > 0);

  const avgSyllabusCompletion = Math.round(
    (subjects.filter((s) => s.syllabusStatus === "Completed").length / (subjects.length || 1)) * 100
  );

  const eventBudgetData = events
    .filter((e) => e.allocatedBudget > 0)
    .map((e) => ({ name: e.name.length > 12 ? e.name.slice(0, 12) + "…" : e.name, allocated: e.allocatedBudget, used: e.usedBudget }));

  const totalAllocated = events.reduce((sum, e) => sum + e.allocatedBudget, 0);
  const totalUsed = events.reduce((sum, e) => sum + e.usedBudget, 0);

  const categoryData = ["Technical", "Cultural", "Sports"].map((cat) => ({
    name: cat,
    value: competitions.filter((c) => c.category === cat).length,
  })).filter((d) => d.value > 0);

  const totalParticipants = competitions.reduce((sum, c) => sum + c.participants.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-400 text-sm">Deeper insights across faculty, academics and events</p>
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Faculty" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={BarChart3} label="Total Faculty" value={faculty.length} color="indigo" />
            <StatCard icon={BarChart3} label="Avg Workload" value={`${Math.round(faculty.reduce((s, f) => s + f.workload, 0) / (faculty.length || 1))} hrs`} color="amber" />
            <StatCard icon={BarChart3} label="Highest Load" value={`${Math.max(...faculty.map((f) => f.workload), 0)} hrs`} color="rose" />
            <StatCard icon={BarChart3} label="Lowest Load" value={`${Math.min(...faculty.map((f) => f.workload), 0)} hrs`} color="green" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">Workload Distribution</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={workloadData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4">Subjects per Faculty</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={subjectsPerFaculty}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="subjects" fill="#a78bfa" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Academic" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={BookOpen} label="Total Subjects" value={subjects.length} color="indigo" />
            <StatCard icon={BookOpen} label="Completed" value={subjects.filter((s) => s.syllabusStatus === "Completed").length} color="green" />
            <StatCard icon={BookOpen} label="Pending" value={subjects.filter((s) => s.syllabusStatus !== "Completed").length} color="amber" />
            <StatCard icon={BookOpen} label="Avg Completion" value={`${avgSyllabusCompletion}%`} color="rose" />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Syllabus Completion Status</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={syllabusStatusCount} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {syllabusStatusCount.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "Events" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={CalendarDays} label="Total Events" value={events.length} color="indigo" />
            <StatCard icon={CalendarDays} label="Total Budget" value={`₹${totalAllocated.toLocaleString()}`} color="amber" />
            <StatCard icon={CalendarDays} label="Budget Used" value={`₹${totalUsed.toLocaleString()}`} color="rose" />
            <StatCard icon={CalendarDays} label="Usage %" value={`${totalAllocated ? Math.round((totalUsed / totalAllocated) * 100) : 0}%`} color="green" />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Budget: Allocated vs Used</h3>
            {eventBudgetData.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-10">No budgeted events yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={eventBudgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="#ddd6fe" radius={[6, 6, 0, 0]} name="Allocated" />
                  <Bar dataKey="used" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Used" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {activeTab === "Competitions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Trophy} label="Total Competitions" value={competitions.length} color="indigo" />
            <StatCard icon={Trophy} label="Total Participants" value={totalParticipants} color="amber" />
            <StatCard icon={Trophy} label="Completed" value={competitions.filter((c) => c.status === "Completed").length} color="green" />
            <StatCard icon={Trophy} label="Upcoming" value={competitions.filter((c) => c.status !== "Completed").length} color="rose" />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Participation by Category</h3>
            {categoryData.length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-10">No competitions yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
