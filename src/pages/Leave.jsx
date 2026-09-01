import { useState } from "react";
import { Plus, Check, X as XIcon, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useLeaves } from "../context/LeaveContext";
import { useFaculty } from "../context/FacultyContext";
import { useToast } from "../context/ToastContext";
import StatCard from "../components/StatCard";
import ApplyLeaveModal from "../components/ApplyLeaveModal";

const statusColors = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-emerald-50 text-emerald-600",
  Rejected: "bg-rose-50 text-rose-600",
};

export default function Leave() {
  const { leaves, updateLeaveStatus } = useLeaves();
  const { faculty } = useFaculty();
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [remarksInput, setRemarksInput] = useState({});

  const getFacultyName = (id) => faculty.find((f) => f.id === id)?.name || "Unknown";

  const pending = leaves.filter((l) => l.status === "Pending").length;
  const approved = leaves.filter((l) => l.status === "Approved").length;
  const rejected = leaves.filter((l) => l.status === "Rejected").length;

  const handleDecision = (leave, status) => {
    const remarks = remarksInput[leave.id] ?? leave.hodRemarks;
    updateLeaveStatus(leave.id, status, remarks || "");
    showToast(`Leave request ${status.toLowerCase()}.`, status === "Approved" ? "success" : "error");
  };

  const sorted = [...leaves].sort((a, b) => (a.status === "Pending" ? -1 : 1));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Leave Management</h1>
          <p className="text-slate-400 text-sm">{leaves.length} leave requests</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={18} />
          Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Clock} label="Pending" value={pending} color="amber" />
        <StatCard icon={CheckCircle2} label="Approved" value={approved} color="green" />
        <StatCard icon={XCircle} label="Rejected" value={rejected} color="rose" />
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Leave Requests</p>
          <p className="text-slate-400 text-sm mt-1">No one has applied for leave yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{getFacultyName(l.facultyId)}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{l.leaveType}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[l.status]}`}>
                  {l.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
                <p className="text-slate-500">
                  <span className="text-slate-400">Leave: </span>
                  {l.fromDate} → {l.toDate}
                </p>
                <p className="text-slate-500">
                  <span className="text-slate-400">Reason: </span>
                  {l.reason}
                </p>
              </div>

              {l.status === "Pending" ? (
                <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
                  <input
                    placeholder="Add a remark (optional)..."
                    value={remarksInput[l.id] ?? ""}
                    onChange={(e) => setRemarksInput({ ...remarksInput, [l.id]: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDecision(l, "Approved")}
                      className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Check size={15} /> Approve
                    </button>
                    <button
                      onClick={() => handleDecision(l, "Rejected")}
                      className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-lg transition-colors"
                    >
                      <XIcon size={15} /> Reject
                    </button>
                  </div>
                </div>
              ) : (
                l.hodRemarks && (
                  <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
                    <span className="font-medium">HOD Remarks: </span>{l.hodRemarks}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && <ApplyLeaveModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
