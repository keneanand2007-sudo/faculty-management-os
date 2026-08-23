import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Calendar, User, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { useEvents } from "../context/EventContext";
import { useFaculty } from "../context/FacultyContext";
import AddEventModal from "../components/AddEventModal";

const tabs = ["Overview", "Budget", "Checklist", "Schedule"];

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, deleteEvent, addChecklistItem, toggleChecklistItem, addScheduleItem } = useEvents();
  const { faculty } = useFaculty();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [newScheduleTime, setNewScheduleTime] = useState("");
  const [newScheduleTitle, setNewScheduleTitle] = useState("");

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Function not found.</p>
        <button onClick={() => navigate("/hod/events")} className="text-brand-600 text-sm mt-2">
          Back to Functions
        </button>
      </div>
    );
  }

  const inCharge = faculty.find((f) => f.id === event.inChargeFacultyId);
  const budgetPercent = event.allocatedBudget > 0 ? Math.round((event.usedBudget / event.allocatedBudget) * 100) : 0;
  const remaining = event.allocatedBudget - event.usedBudget;

  const handleDelete = () => {
    if (confirm(`Delete function "${event.name}"? This action cannot be easily undone.`)) {
      deleteEvent(event.id);
      navigate("/hod/events");
    }
  };

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (!newChecklistItem.trim()) return;
    addChecklistItem(event.id, newChecklistItem.trim());
    setNewChecklistItem("");
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newScheduleTime.trim() || !newScheduleTitle.trim()) return;
    addScheduleItem(event.id, newScheduleTime.trim(), newScheduleTitle.trim());
    setNewScheduleTime("");
    setNewScheduleTitle("");
  };

  const completedCount = event.checklist.filter((c) => c.status === "Completed").length;

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/hod/events")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Functions
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{event.name}</h1>
            <p className="text-slate-400 text-sm mt-1">{event.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin size={13} /> {event.venue}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar size={13} /> {event.startDate}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <User size={13} /> {inCharge?.name || "Unassigned"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Pencil size={15} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Status</span>
            <span className="font-medium text-slate-700">{event.status}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Venue</span>
            <span className="font-medium text-slate-700">{event.venue}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Dates</span>
            <span className="font-medium text-slate-700">{event.startDate} → {event.endDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">In-charge Faculty</span>
            <span className="font-medium text-slate-700">{inCharge?.name || "Unassigned"}</span>
          </div>
        </div>
      )}

      {activeTab === "Budget" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-xs text-slate-400">Allocated</p>
              <p className="text-xl font-bold text-slate-800 mt-1">₹{event.allocatedBudget.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Used</p>
              <p className="text-xl font-bold text-brand-600 mt-1">₹{event.usedBudget.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Remaining</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">₹{remaining.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Budget Used</span>
            <span>{budgetPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, budgetPercent)}%` }} />
          </div>
        </div>
      )}

      {activeTab === "Checklist" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Preparation Checklist</h3>
            <span className="text-xs text-slate-400">{completedCount}/{event.checklist.length} done</span>
          </div>

          <div className="space-y-2 mb-4">
            {event.checklist.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleChecklistItem(event.id, c.id)}
                className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 text-left"
              >
                {c.status === "Completed" ? (
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                ) : (
                  <Circle size={18} className="text-slate-300 shrink-0" />
                )}
                <span className={`text-sm ${c.status === "Completed" ? "text-slate-400 line-through" : "text-slate-700"}`}>
                  {c.name}
                </span>
              </button>
            ))}
            {event.checklist.length === 0 && (
              <p className="text-slate-400 text-sm py-4 text-center">No checklist items yet.</p>
            )}
          </div>

          <form onSubmit={handleAddChecklist} className="flex gap-2">
            <input
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Add checklist item..."
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 rounded-xl">
              <Plus size={18} />
            </button>
          </form>
        </div>
      )}

      {activeTab === "Schedule" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Event Schedule</h3>

          <div className="space-y-3 mb-4">
            {event.scheduleItems.map((s) => (
              <div key={s.id} className="flex items-center gap-4 py-2 border-b border-slate-50 last:border-0">
                <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full whitespace-nowrap">
                  {s.time}
                </span>
                <span className="text-sm text-slate-700">{s.title}</span>
              </div>
            ))}
            {event.scheduleItems.length === 0 && (
              <p className="text-slate-400 text-sm py-4 text-center">No schedule items yet.</p>
            )}
          </div>

          <form onSubmit={handleAddSchedule} className="flex gap-2">
            <input
              value={newScheduleTime}
              onChange={(e) => setNewScheduleTime(e.target.value)}
              placeholder="10:00 AM"
              className="w-28 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <input
              value={newScheduleTitle}
              onChange={(e) => setNewScheduleTitle(e.target.value)}
              placeholder="Session title..."
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 rounded-xl">
              <Plus size={18} />
            </button>
          </form>
        </div>
      )}

      {showEdit && <AddEventModal editData={event} onClose={() => setShowEdit(false)} />}
    </div>
  );
}
