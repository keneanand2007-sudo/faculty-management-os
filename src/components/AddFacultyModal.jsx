import { useState } from "react";
import { X } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import { useToast } from "../context/ToastContext";

export default function AddFacultyModal({ onClose, editData }) {
  const { addFaculty, updateFaculty, isEmailTaken } = useFaculty();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(
    editData || {
      name: "",
      email: "",
      phone: "",
      department: "Computer Science",
      designation: "Assistant Professor",
      qualification: "",
      joiningDate: "",
      status: "Active",
    }
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    } else if (isEmailTaken(form.email, editData?.id)) {
      errs.email = "This email is already used by another faculty.";
    }
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) {
      errs.phone = "Phone number must be 10 digits.";
    }
    if (!form.department.trim()) errs.department = "Department is required.";
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
      updateFaculty(editData.id, form);
      showToast(`${form.name} updated successfully.`);
    } else {
      addFaculty(form);
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
          <h2 className="text-lg font-bold text-slate-800">{editData ? "Edit Faculty" : "Add New Faculty"}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="text-xs font-medium text-slate-500">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className={fieldClass("name")} />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className={fieldClass("email")} />
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={fieldClass("phone")} />
              {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Department</label>
              <input name="department" value={form.department} onChange={handleChange} className={fieldClass("department")} />
              {errors.department && <p className="text-xs text-rose-500 mt-1">{errors.department}</p>}
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

          <div>
            <label className="text-xs font-medium text-slate-500">Status</label>
            <select
              name="status" value={form.status} onChange={handleChange}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>
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
