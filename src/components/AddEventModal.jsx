import { useState } from "react";
import { X } from "lucide-react";
import { useEvents } from "../context/EventContext";
import { useFaculty } from "../context/FacultyContext";

export default function AddEventModal({ onClose, editData }) {
  const { addEvent, updateEvent } = useEvents();
  const { faculty } = useFaculty();

  const [form, setForm] = useState(
    editData || {
      category: "Function",
      name: "",
      description: "",
      venue: "",
      startDate: "",
      endDate: "",
      inChargeFacultyId: faculty[0]?.id || "",
      allocatedBudget: "",
      status: "Upcoming",
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, allocatedBudget: Number(form.allocatedBudget) || 0 };
    if (editData) {
      updateEvent(editData.id, payload);
    } else {
      addEvent(payload);
    }
    onClose();
  };

  const isLight = form.category === "Holiday" || form.category === "Exam";

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Entry" : "Add to Calendar"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Type</label>
            <div className="flex gap-2 mt-1 flex-wrap">
              {["Function", "Meeting", "Exam", "Holiday"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    form.category === cat ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Name</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange} rows={2}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 resize-none"
            />
          </div>

          {!isLight && (
            <div>
              <label className="text-xs font-medium text-slate-500">Venue</label>
              <input
                name="venue" value={form.venue} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Start Date</label>
              <input
                name="startDate" type="date" value={form.startDate} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">End Date</label>
              <input
                name="endDate" type="date" value={form.endDate} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {!isLight && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-500">In-charge Faculty</label>
                <select
                  name="inChargeFacultyId" value={form.inChargeFacultyId} onChange={handleChange}
                  className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                >
                  {faculty.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Allocated Budget (₹)</label>
                <input
                  name="allocatedBudget" type="number" value={form.allocatedBudget} onChange={handleChange}
                  className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Add to Calendar"}
          </button>
        </form>
      </div>
    </div>
  );
}
