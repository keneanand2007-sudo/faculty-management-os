import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, User, ChevronRight } from "lucide-react";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";
import AddSubjectModal from "../components/AddSubjectModal";

const statusColors = {
  "Not Started": "bg-slate-100 text-slate-500",
  "In Progress": "bg-amber-50 text-amber-600",
  "Completed": "bg-emerald-50 text-emerald-600",
};

export default function Subjects() {
  const { subjects, deleteSubject } = useSubjects();
  const { faculty } = useFaculty();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  const getFacultyName = (id) => faculty.find((f) => f.id === id)?.name || "Unassigned";

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.className.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (e, s) => { e.stopPropagation(); setEditData(s); setShowModal(true); };
  const openAdd = () => { setEditData(null); setShowModal(true); };
  const handleDelete = (e, s) => { e.stopPropagation(); if (confirm(`Remove subject "${s.name}"?`)) deleteSubject(s.id); };

  const progressOf = (s) => {
    const topics = s.topics || [];
    if (topics.length === 0) return null;
    return Math.round((topics.filter((t) => t.status === "Completed").length / topics.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Subjects & Class Mapping</h1>
          <p className="text-slate-400 text-sm">{subjects.length} subjects across all classes</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={18} /> Add Subject
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 w-full max-w-sm">
        <Search size={16} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by subject, code, class..."
          className="outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-400 uppercase">
              <th className="px-5 py-3 font-medium">Subject</th>
              <th className="px-5 py-3 font-medium">Class</th>
              <th className="px-5 py-3 font-medium">Faculty</th>
              <th className="px-5 py-3 font-medium">Syllabus Progress</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const pct = progressOf(s);
              return (
                <tr key={s.id} onClick={() => navigate(`/hod/subjects/${s.id}`)} className="border-t border-slate-50 hover:bg-slate-50/50 cursor-pointer">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.code} • Sem {s.semester}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{s.className}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <User size={13} className="text-slate-400" />
                      {getFacultyName(s.facultyId)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 w-48">
                    {pct === null ? (
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[s.syllabusStatus]}`}>{s.syllabusStatus}</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{pct}%</span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={(e) => openEdit(e, s)} className="text-slate-400 hover:text-brand-600"><Pencil size={16} /></button>
                      <button onClick={(e) => handleDelete(e, s)} className="text-slate-400 hover:text-rose-600"><Trash2 size={16} /></button>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && <p className="text-slate-400 text-sm text-center py-10">No subjects found.</p>}
      </div>

      {showModal && <AddSubjectModal editData={editData} onClose={() => setShowModal(false)} />}
    </div>
  );
}
