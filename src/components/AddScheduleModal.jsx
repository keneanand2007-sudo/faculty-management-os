import { useState } from "react";
import { X } from "lucide-react";
import { useTimetable } from "../context/TimetableContext";
import { useSubjects } from "../context/SubjectContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AddScheduleModal({ onClose, editData, defaultDay }) {
  const { addSchedule, updateSchedule } = useTimetable();
  const { subjects } = useSubjects();

  const [form, setForm] = useState(
    editData || {
      day: defaultDay || "Monday",
      startTime: "",
      endTime: "",
      subjectId: subjects[0]?.id || "",
      room: "",
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateSchedule(editData.id, form);
    } else {
      addSchedule(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Period" : "Add Period"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Day</label>
            <select
              name="day" value={form.day} onChange={handleChange}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {days.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Start Time</label>
              <input
                name="startTime" type="time" value={form.startTime} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">End Time</label>
              <input
                name="endTime" type="time" value={form.endTime} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Subject</label>
            <select
              name="subjectId" value={form.subjectId} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.className})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Room</label>
            <input
              name="room" value={form.room} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Add Period"}
          </button>
        </form>
      </div>
    </div>
  );
}
