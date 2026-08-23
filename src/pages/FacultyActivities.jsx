import { useState } from "react";
import { Plus, Calendar, Pencil, Trash2 } from "lucide-react";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useActivities } from "../context/ActivityContext";
import { useSubjects } from "../context/SubjectContext";
import AddActivityModal from "../components/AddActivityModal";

const statusColors = {
  Pending: "bg-slate-100 text-slate-500",
  "In Progress": "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

export default function FacultyActivities() {
  const { currentFacultyId } = useCurrentUser();
  const { activities, deleteActivity } = useActivities();
  const { subjects } = useSubjects();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const myActivities = activities.filter((a) => a.facultyId === currentFacultyId);
  const getSubjectName = (id) => subjects.find((s) => s.id === id)?.name || "Unknown Subject";

  const openEdit = (a) => { setEditData(a); setShowModal(true); };
  const openAdd = () => { setEditData(null); setShowModal(true); };
  const handleDelete = (a) => { if (confirm(`Remove activity "${a.title}"?`)) deleteActivity(a.id); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Activities</h1>
          <p className="text-slate-400 text-sm">{myActivities.length} activities recorded</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={18} /> Add Activity
        </button>
      </div>

      {myActivities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Activities Found</p>
          <p className="text-slate-400 text-sm mt-1">You haven't added any activities yet.</p>
          <button onClick={openAdd} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors mt-4">
            <Plus size={16} /> Add Activity
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {myActivities.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-800 leading-tight">{a.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[a.status]}`}>
                  {a.status}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">{getSubjectName(a.subjectId)} • {a.className}</p>
              {a.description && <p className="text-sm text-slate-500 mt-3 line-clamp-2">{a.description}</p>}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-500 flex items-center gap-1.5"><Calendar size={13} /> {a.date}</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => openEdit(a)} className="text-slate-400 hover:text-brand-600"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(a)} className="text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddActivityModal editData={editData} onClose={() => setShowModal(false)} />}
    </div>
  );
}
