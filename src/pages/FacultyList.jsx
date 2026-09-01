import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Mail, Phone, Download } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import AddFacultyModal from "../components/AddFacultyModal";

const statusColors = {
  Active: "bg-emerald-50 text-emerald-600",
  "On Leave": "bg-amber-50 text-amber-600",
  Inactive: "bg-slate-100 text-slate-500",
};

export default function FacultyList() {
  const { faculty } = useFaculty();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const filtered = faculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.department.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Department", "Designation", "Status", "Workload"];
    const rows = faculty.map((f) => [f.id, f.name, f.email, f.phone, f.department, f.designation, f.status || "Active", f.workload]);
    const csv = [headers, ...rows].map((r) => r.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "faculty_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Faculty Management</h1>
          <p className="text-slate-400 text-sm">{faculty.length} faculty members</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-300 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Plus size={18} />
            Add Faculty
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2.5 w-full max-w-sm">
        <Search size={16} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by name, ID, department..."
          className="outline-none text-sm w-full placeholder:text-slate-400"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/hod/faculty/${f.id}`)}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-semibold">
                  {f.photo}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{f.name}</p>
                  <p className="text-xs text-slate-400">{f.designation}</p>
                </div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-full whitespace-nowrap ${statusColors[f.status || "Active"]}`}>
                {f.status || "Active"}
              </span>
            </div>

            <div className="mt-4 space-y-1.5">
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <Mail size={13} /> {f.email}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <Phone size={13} /> {f.phone}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
              <span className="text-xs font-medium text-slate-400">{f.id}</span>
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                {f.workload} hrs/week
              </span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-slate-400 text-sm col-span-full text-center py-10">No faculty found.</p>
        )}
      </div>

      {showModal && <AddFacultyModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
