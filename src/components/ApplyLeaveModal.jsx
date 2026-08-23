import { useState } from "react";
import { X } from "lucide-react";
import { useLeaves } from "../context/LeaveContext";
import { useFaculty } from "../context/FacultyContext";

export default function ApplyLeaveModal({ onClose, defaultFacultyId }) {
  const { applyLeave } = useLeaves();
  const { faculty } = useFaculty();

  const [form, setForm] = useState({
    facultyId: defaultFacultyId || faculty[0]?.id || "",
    leaveType: "Casual Leave",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    applyLeave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Apply for Leave</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!defaultFacultyId && (
            <div>
              <label className="text-xs font-medium text-slate-500">Faculty</label>
              <select
                name="facultyId" value={form.facultyId} onChange={handleChange}
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              >
                {faculty.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-500">Leave Type</label>
            <select
              name="leaveType" value={form.leaveType} onChange={handleChange}
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Personal</option>
              <option>Earned Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-slate-500">From Date</label>
              <input
                name="fromDate" type="date" value={form.fromDate} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">To Date</label>
              <input
                name="toDate" type="date" value={form.toDate} onChange={handleChange} required
                className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500">Reason</label>
            <textarea
              name="reason" value={form.reason} onChange={handleChange} rows={3} required
              className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 resize-none"
            />
          </div>

          <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 rounded-xl transition-colors mt-2">
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  );
}
