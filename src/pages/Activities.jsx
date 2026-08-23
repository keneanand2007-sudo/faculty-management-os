import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Calendar, User } from "lucide-react";
import { useActivities } from "../context/ActivityContext";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";
import AddActivityModal from "../components/AddActivityModal";

const statusColors = {
  Pending: "bg-slate-100 text-slate-500",
  "In Progress": "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

export default function Activities() {
  const { activities, deleteActivity } = useActivities();
  const { subjects } = useSubjects();
  const { faculty } = useFaculty();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const getSubjectName = (id) => subjects.find((s) => s.id === id)?.name || "Unknown Subject";
  const getFacultyName = (id) => faculty.find((f) => f.id === id)?.name || "Unassigned";

  const filtered = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.className.toLowerCase().includes(search.toLowerCase()) ||
      getSubjectName(a.subjectId).toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (a) => {
    setEditData(a);
    setShowModal(true);
  };

  const openAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleDelete = (a) => {
    if (confirm(`Remove activity "${a.title}"?`)) deleteActivity(a.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Activities & Practicals</h1>
          <p className="text-slate-400 text-sm">{activities.length} activities recorded</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={18} />
          Add Activity
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 w-full max-w-sm">
        <Search size={16} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by title, subject, class..."
          className="outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Activities Found</p>
          <p className="text-slate-400 text-sm mt-1">You haven't added any activities yet.</p>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors mt-4"
          >
            <Plus size={16} /> Add Activity
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-800 leading-tight">{a.title}</h3>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[a.status]}`}>
                  {a.status}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2">{getSubjectName(a.subjectId)} • {a.className}</p>

              {a.description && (
                <p className="text-sm text-slate-500 mt-3 line-clamp-2">{a.description}</p>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Calendar size={13} /> {a.date}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <User size={13} /> {getFacultyName(a.facultyId).split(" ").slice(-1)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 mt-3">
                <button onClick={() => openEdit(a)} className="text-slate-400 hover:text-brand-600">
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(a)} className="text-slate-400 hover:text-rose-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && <AddActivityModal editData={editData} onClose={() => setShowModal(false)} />}
    </div>
  );
}
