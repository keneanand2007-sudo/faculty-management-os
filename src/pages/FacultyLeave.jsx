import { useState } from "react";
import { Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useLeaves } from "../context/LeaveContext";
import StatCard from "../components/StatCard";
import ApplyLeaveModal from "../components/ApplyLeaveModal";

const statusColors = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-emerald-50 text-emerald-600",
  Rejected: "bg-rose-50 text-rose-600",
};

export default function FacultyLeave() {
  const { currentFacultyId } = useCurrentUser();
  const { leaves } = useLeaves();
  const [showModal, setShowModal] = useState(false);

  const myLeaves = leaves.filter((l) => l.facultyId === currentFacultyId);
  const pending = myLeaves.filter((l) => l.status === "Pending").length;
  const approved = myLeaves.filter((l) => l.status === "Approved").length;
  const rejected = myLeaves.filter((l) => l.status === "Rejected").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Leave</h1>
          <p className="text-slate-400 text-sm">{myLeaves.length} requests</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={18} /> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Clock} label="Pending" value={pending} color="amber" />
        <StatCard icon={CheckCircle2} label="Approved" value={approved} color="green" />
        <StatCard icon={XCircle} label="Rejected" value={rejected} color="rose" />
      </div>

      {myLeaves.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Leave Requests</p>
          <p className="text-slate-400 text-sm mt-1">You haven't applied for any leave yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myLeaves.map((l) => (
            <div key={l.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between">
                <p className="font-semibold text-slate-800">{l.leaveType}</p>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[l.status]}`}>{l.status}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{l.fromDate} → {l.toDate}</p>
              <p className="text-sm text-slate-500 mt-1">{l.reason}</p>
              {l.hodRemarks && (
                <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-50">
                  <span className="font-medium">HOD Remarks: </span>{l.hodRemarks}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && <ApplyLeaveModal onClose={() => setShowModal(false)} defaultFacultyId={currentFacultyId} />}
    </div>
  );
}
