import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Calendar as CalendarIcon, List, ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../context/EventContext";
import StatCard from "../components/StatCard";
import AddEventModal from "../components/AddEventModal";
import DayDetailModal from "../components/DayDetailModal";
import { CalendarDays, CheckCircle2, Clock, Wallet } from "lucide-react";

const statusColors = {
  Upcoming: "bg-sky-50 text-sky-600",
  Ongoing: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
  Scheduled: "bg-sky-50 text-sky-600",
};

const categoryDot = {
  Function: "bg-brand-500",
  Meeting: "bg-sky-500",
  Exam: "bg-rose-500",
  Holiday: "bg-emerald-500",
};

const categoryBg = {
  Function: "bg-brand-50 text-brand-700",
  Meeting: "bg-sky-50 text-sky-700",
  Exam: "bg-rose-50 text-rose-700",
  Holiday: "bg-emerald-50 text-emerald-700",
};

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export default function Events() {
  const { events } = useEvents();
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState("list");
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const functionsOnly = events.filter((e) => (e.category || "Function") === "Function" || (e.category || "Function") === "Meeting");
  const usedBudget = events.reduce((sum, e) => sum + (e.usedBudget || 0), 0);
  const upcoming = events.filter((e) => e.status === "Upcoming" || e.status === "Scheduled").length;
  const completed = events.filter((e) => e.status === "Completed").length;

  const baseMonth = new Date(2026, 7 + monthOffset, 1);
  const monthLabel = baseMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const firstDayOfWeek = baseMonth.getDay();
  const daysInMonth = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + 1, 0).getDate();

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      const start = toDateOnly(new Date(e.startDate));
      const end = toDateOnly(new Date(e.endDate || e.startDate));
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().slice(0, 10);
        if (!map[key]) map[key] = [];
        map[key].push(e);
      }
    });
    return map;
  }, [events]);

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const openDay = (day) => {
    const dateObj = new Date(baseMonth.getFullYear(), baseMonth.getMonth(), day);
    const key = dateObj.toISOString().slice(0, 10);
    setSelectedDay({
      label: dateObj.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      events: eventsByDate[key] || [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Events & Calendar</h1>
          <p className="text-slate-400 text-sm">Functions, meetings, exams and holidays in one place</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={18} />
          Add to Calendar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Total Entries" value={events.length} color="indigo" />
        <StatCard icon={Clock} label="Upcoming" value={upcoming} color="amber" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed} color="green" />
        <StatCard icon={Wallet} label="Budget Used" value={`₹${usedBudget.toLocaleString()}`} color="rose" />
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit">
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "list" ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <List size={15} /> List
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === "calendar" ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          <CalendarIcon size={15} /> Calendar
        </button>
      </div>

      {view === "list" && (
        functionsOnly.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
            <p className="font-semibold text-slate-700">No Functions Found</p>
            <p className="text-slate-400 text-sm mt-1">Create your first college function to get started.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {functionsOnly.map((e) => (
              <div
                key={e.id}
                onClick={() => navigate(`/hod/events/${e.id}`)}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${categoryDot[e.category || "Function"]}`}></span>
                    <h3 className="font-semibold text-slate-800 leading-tight">{e.name}</h3>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[e.status]}`}>
                    {e.status}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{e.description}</p>

                <div className="mt-4 space-y-1.5">
                  {e.venue && (
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <MapPin size={13} /> {e.venue}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <CalendarIcon size={13} /> {e.startDate} {e.endDate !== e.startDate ? `→ ${e.endDate}` : ""}
                  </p>
                </div>

                {e.allocatedBudget > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                      <span>Budget Used</span>
                      <span>{Math.round((e.usedBudget / e.allocatedBudget) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full"
                        style={{ width: `${Math.min(100, (e.usedBudget / e.allocatedBudget) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}

      {view === "calendar" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setMonthOffset(monthOffset - 1)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
              <ChevronLeft size={18} />
            </button>
            <h3 className="font-semibold text-slate-800">{monthLabel}</h3>
            <button onClick={() => setMonthOffset(monthOffset + 1)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="min-h-[80px]"></div>;
              const dateObj = new Date(baseMonth.getFullYear(), baseMonth.getMonth(), day);
              const key = dateObj.toISOString().slice(0, 10);
              const dayEvents = eventsByDate[key] || [];
              return (
                <div
                  key={i}
                  onClick={() => openDay(day)}
                  className="min-h-[80px] border border-slate-50 rounded-lg p-1.5 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <p className="text-xs font-medium text-slate-500">{day}</p>
                  <div className="space-y-1 mt-1">
                    {dayEvents.slice(0, 2).map((e) => (
                      <p key={e.id} className={`text-[10px] font-medium px-1.5 py-0.5 rounded truncate ${categoryBg[e.category || "Function"]}`}>
                        {e.name}
                      </p>
                    ))}
                    {dayEvents.length > 2 && <p className="text-[10px] text-slate-400">+{dayEvents.length - 2} more</p>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-50 flex-wrap">
            {Object.entries(categoryDot).map(([cat, dot]) => (
              <span key={cat} className="flex items-center gap-1.5 text-xs text-slate-500">
                <span className={`w-2 h-2 rounded-full ${dot}`}></span> {cat}
              </span>
            ))}
          </div>
        </div>
      )}

      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
      {selectedDay && <DayDetailModal dateLabel={selectedDay.label} events={selectedDay.events} onClose={() => setSelectedDay(null)} />}
    </div>
  );
}
