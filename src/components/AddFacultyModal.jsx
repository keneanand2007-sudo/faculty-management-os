import { useState } from "react";
import { X } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";

export default function AddFacultyModal({ onClose, editData }) {
  const { addFaculty, updateFaculty } = useFaculty();
  const [form, setForm] = useState(
    editData || {
      name: "",
      email: "",
      phone: "",
      department: "Computer Science",
      designation: "Assistant Professor",
      qualification: "",
      joiningDate: "",
    }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      updateFaculty(editData.id, form);
    } else {
      addFaculty(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Faculty" : "Add New Faculty"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-500">Full Name</label>
            <input
              name="name" value={form.name} onChange={handleChange} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Email</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Phone</label>
              <input
                name="phone" value={form.phone} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Department</label>
              <input
                name="department" value={form.department} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Designation</label>
              <select
                name="designation" value={form.designation} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              >
                <option>HOD</option>
                <option>Associate Professor</option>
                <option>Assistant Professor</option>
                <option>Lecturer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Qualification</label>
              <input
                name="qualification" value={form.qualification} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Joining Date</label>
              <input
                name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2"
          >
            {editData ? "Save Changes" : "Add Faculty"}
          </button>
        </form>
      </div>
    </div>
  );
}
