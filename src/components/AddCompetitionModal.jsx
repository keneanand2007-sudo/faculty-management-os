import { useState } from "react";
import { X } from "lucide-react";
import { useCompetitions } from "../context/CompetitionContext";
import { useFaculty } from "../context/FacultyContext";

export default function AddCompetitionModal({ onClose, editData }) {
  const { addCompetition, updateCompetition } = useCompetitions();
  const { faculty } = useFaculty();

  const [form, setForm] = useState(
    editData || {
      name: "",
      category: "Technical",
      date: "",
      time: "",
      venue: "",
      coordinatorId: faculty[0]?.id || "",
      status: "Upcoming",
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateCompetition(editData.id, form);
    } else {
      addCompetition(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Competition" : "Create New Competition"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Competition Name</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Category</label>
            <div className="flex gap-2 mt-1">
              {["Technical", "Cultural", "Sports"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    form.category === cat ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Date</label>
              <input
                name="date" type="date" value={form.date} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Time</label>
              <input
                name="time" type="time" value={form.time} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Venue</label>
            <input
              name="venue" value={form.venue} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Coordinator</label>
              <select
                name="coordinatorId" value={form.coordinatorId} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              >
                {faculty.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Status</label>
              <select
                name="status" value={form.status} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Create Competition"}
          </button>
        </form>
      </div>
    </div>
  );
}
