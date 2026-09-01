import { useState } from "react";
import { X } from "lucide-react";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";
import { useToast } from "../context/ToastContext";

export default function AddSubjectModal({ onClose, editData }) {
  const { addSubject, updateSubject } = useSubjects();
  const { faculty } = useFaculty();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Subject name is required.";
    if (!form.code.trim()) errs.code = "Subject code is required.";
    if (!form.semester.trim()) errs.semester = "Semester is required.";
    if (!form.className.trim()) errs.className = "Class is required.";
    if (!form.totalHours || Number(form.totalHours) <= 0) errs.totalHours = "Enter valid total hours.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (editData) {
      updateSubject(editData.id, form);
      showToast(`${form.name} updated successfully.`);
    } else {
      addSubject(form);
      showToast(`${form.name} added successfully.`);
    }
    onClose();
  };

  const fieldClass = (field) =>
    `w-full mt-1 border rounded-xl px-3 py-2.5 text-sm outline-none ${
      errors[field] ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-brand-500"
    }`;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Subject" : "Add New Subject"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="text-xs font-medium text-slate-500">Subject Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={fieldClass("name")} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Subject Code</label>
              <input name="code" value={form.code} onChange={handleChange} className={fieldClass("code")} />
              {errors.code && <p className="text-xs text-rose-500 mt-1">{errors.code}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Semester</label>
              <input name="semester" value={form.semester} onChange={handleChange} className={fieldClass("semester")} />
              {errors.semester && <p className="text-xs text-rose-500 mt-1">{errors.semester}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Class</label>
              <input name="className" value={form.className} onChange={handleChange} placeholder="e.g. BCA III" className={fieldClass("className")} />
              {errors.className && <p className="text-xs text-rose-500 mt-1">{errors.className}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Total Hours</label>
              <input name="totalHours" type="number" value={form.totalHours} onChange={handleChange} className={fieldClass("totalHours")} />
              {errors.totalHours && <p className="text-xs text-rose-500 mt-1">{errors.totalHours}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Assign Faculty</label>
            <select
              name="facultyId" value={form.facultyId} onChange={handleChange}
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
