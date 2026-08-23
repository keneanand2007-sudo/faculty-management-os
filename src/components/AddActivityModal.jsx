import { useState } from "react";
import { X } from "lucide-react";
import { useActivities } from "../context/ActivityContext";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";

export default function AddActivityModal({ onClose, editData }) {
  const { addActivity, updateActivity } = useActivities();
  const { subjects } = useSubjects();
  const { faculty } = useFaculty();

  const [form, setForm] = useState(
    editData || {
      title: "",
      subjectId: subjects[0]?.id || "",
      facultyId: faculty[0]?.id || "",
      className: "",
      date: "",
      description: "",
      status: "Pending",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subjectId") {
      const subj = subjects.find((s) => s.id === value);
      setForm({ ...form, subjectId: value, className: subj?.className || "", facultyId: subj?.facultyId || form.facultyId });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateActivity(editData.id, form);
    } else {
      addActivity(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Activity" : "Add New Activity"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Activity / Practical Title</label>
            <input
              name="title" value={form.title} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Class</label>
              <input
                name="className" value={form.className} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Date</label>
              <input
                name="date" type="date" value={form.date} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Description</label>
            <textarea
              name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select
              name="status" value={form.status} onChange={handleChange}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Add Activity"}
          </button>
        </form>
      </div>
    </div>
  );
}
