import { useState } from "react";
import { X } from "lucide-react";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";

export default function AddSubjectModal({ onClose, editData }) {
  const { addSubject, updateSubject } = useSubjects();
  const { faculty } = useFaculty();

  const [form, setForm] = useState(
    editData || {
      name: "",
      code: "",
      semester: "",
      className: "",
      facultyId: faculty[0]?.id || "",
      totalHours: "",
      syllabusStatus: "Not Started",
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateSubject(editData.id, form);
    } else {
      addSubject(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Subject" : "Add New Subject"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Subject Name</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Subject Code</label>
              <input
                name="code" value={form.code} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Semester</label>
              <input
                name="semester" value={form.semester} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Class</label>
              <input
                name="className" value={form.className} onChange={handleChange} required
                placeholder="e.g. BCA III"
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Total Hours</label>
              <input
                name="totalHours" type="number" value={form.totalHours} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Assign Faculty</label>
            <select
              name="facultyId" value={form.facultyId} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              {faculty.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Syllabus Status</label>
            <select
              name="syllabusStatus" value={form.syllabusStatus} onChange={handleChange}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Add Subject"}
          </button>
        </form>
      </div>
    </div>
  );
}
