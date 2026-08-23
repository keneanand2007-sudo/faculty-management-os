import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar, GraduationCap, Trash2, Pencil } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import AddFacultyModal from "../components/AddFacultyModal";

export default function FacultyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { faculty, deleteFaculty } = useFaculty();
  const [showEdit, setShowEdit] = useState(false);

  const person = faculty.find((f) => f.id === id);

  if (!person) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Faculty not found.</p>
        <button onClick={() => navigate("/hod/faculty")} className="text-brand-600 text-sm mt-2">
          Back to Faculty List
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm(`Remove ${person.name} from faculty list?`)) {
      deleteFaculty(person.id);
      navigate("/hod/faculty");
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/hod/faculty")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Faculty List
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xl font-bold">
              {person.photo}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">{person.name}</h1>
              <p className="text-slate-400 text-sm">
                {person.designation} • {person.department}
              </p>
              <span className="inline-block mt-2 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                {person.id}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowEdit(true)}
              className="flex items-center gap-1.5 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Pencil size={15} /> Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-lg transition-colors"
            >
              <Trash2 size={15} /> Remove
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-slate-400" />
            <span className="text-slate-700">{person.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-slate-400" />
            <span className="text-slate-700">{person.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <GraduationCap size={16} className="text-slate-400" />
            <span className="text-slate-700">{person.qualification || "—"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-slate-700">Joined {person.joiningDate || "—"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
          <p className="text-2xl font-bold text-slate-800">{person.subjects}</p>
          <p className="text-xs text-slate-400 mt-1">Subjects</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
          <p className="text-2xl font-bold text-slate-800">{person.classes}</p>
          <p className="text-xs text-slate-400 mt-1">Classes</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm text-center">
          <p className="text-2xl font-bold text-slate-800">{person.workload} hrs</p>
          <p className="text-xs text-slate-400 mt-1">Workload/week</p>
        </div>
      </div>

      {showEdit && <AddFacultyModal editData={person} onClose={() => setShowEdit(false)} />}
    </div>
  );
}
