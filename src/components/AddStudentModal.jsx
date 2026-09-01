import { useState } from "react";
import { X } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import { useToast } from "../context/ToastContext";
import { classesList } from "../data/mockData";

export default function AddStudentModal({ onClose, defaultClass }) {
  const { addStudent, isRollNoTaken } = useStudents();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    className: defaultClass || classesList[0]?.name || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Student name is required.";
    if (!form.rollNo.trim()) {
      errs.rollNo = "Roll number is required.";
    } else if (isRollNoTaken(form.rollNo.trim(), form.className)) {
      errs.rollNo = "This roll number already exists in this class.";
    }
    if (!form.className.trim()) errs.className = "Class is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addStudent(form);
    showToast(`${form.name} added to ${form.className}.`);
    onClose();
  };

  const fieldClass = (field) =>
    `w-full mt-1 border rounded-xl px-3 py-2.5 text-sm outline-none ${
      errors[field] ? "border-rose-400 focus:border-rose-500" : "border-slate-200 focus:border-brand-500"
    }`;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Add Student</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="text-xs font-medium text-slate-500">Student Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={fieldClass("name")} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Roll No</label>
              <input name="rollNo" value={form.rollNo} onChange={handleChange} className={fieldClass("rollNo")} />
              {errors.rollNo && <p className="text-xs text-rose-500 mt-1">{errors.rollNo}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Class</label>
              <select
                name="className" value={form.className} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              >
                {classesList.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
