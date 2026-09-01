import { useState } from "react";
import * as XLSX from "xlsx";
import { X, Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { useStudents } from "../context/StudentContext";
import { useToast } from "../context/ToastContext";
import { classesList } from "../data/mockData";

export default function ImportStudentsModal({ onClose, defaultClass }) {
  const { addStudentsBulk } = useStudents();
  const { showToast } = useToast();
  const [selectedClass, setSelectedClass] = useState(defaultClass || classesList[0]?.name || "");
  const [preview, setPreview] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setError("");

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        const normalized = rows
          .map((r) => {
            const name = r.Name || r.name || r.NAME || r["Student Name"] || "";
            const rollNo = String(r.RollNo || r.rollNo || r["Roll No"] || r.Roll || r.ROLLNO || "").trim();
            return { name: String(name).trim(), rollNo };
          })
          .filter((r) => r.name && r.rollNo);

        if (normalized.length === 0) {
          setError("No valid rows found. Make sure columns are named 'Name' and 'RollNo'.");
          setPreview([]);
          return;
        }
        setPreview(normalized);
      } catch (err) {
        setError("Could not read this file. Please upload a valid Excel (.xlsx) or CSV file.");
        setPreview([]);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImport = () => {
    if (preview.length === 0) return;
    const count = addStudentsBulk(preview.map((p) => ({ ...p, className: selectedClass })));
    showToast(`${count} students imported into ${selectedClass}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Import Students from Excel</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-slate-500">Import into Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full mt-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
          >
            {classesList.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-brand-300 rounded-xl py-8 cursor-pointer transition-colors">
          <Upload size={24} className="text-slate-400" />
          <span className="text-sm text-slate-500">
            {fileName || "Click to upload .xlsx, .xls or .csv"}
          </span>
          <span className="text-xs text-slate-400">Columns needed: Name, RollNo</span>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
        </label>

        {error && <p className="text-sm text-rose-500 mt-3">{error}</p>}

        {preview.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
              <FileSpreadsheet size={16} className="text-emerald-500" />
              {preview.length} students found — preview
            </p>
            <div className="max-h-48 overflow-y-auto border border-slate-100 rounded-xl divide-y divide-slate-50">
              {preview.map((p, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="text-slate-700">{p.name}</span>
                  <span className="text-xs text-slate-400">Roll {p.rollNo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={preview.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-semibold py-2.5 rounded-xl transition-colors mt-5"
        >
          <CheckCircle2 size={16} />
          Import {preview.length > 0 ? `${preview.length} Students` : ""}
        </button>
      </div>
    </div>
  );
}
