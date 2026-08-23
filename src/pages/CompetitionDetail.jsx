import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Calendar, User, Trash2, Pencil, Medal } from "lucide-react";
import { useCompetitions } from "../context/CompetitionContext";
import { useFaculty } from "../context/FacultyContext";
import AddCompetitionModal from "../components/AddCompetitionModal";

const tabs = ["Overview", "Participants", "Results & Ranking"];

const medalColor = { 1: "text-amber-500", 2: "text-slate-400", 3: "text-orange-600" };

export default function CompetitionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { competitions, deleteCompetition, addParticipant, removeParticipant, saveResult } = useCompetitions();
  const { faculty } = useFaculty();
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const [pName, setPName] = useState("");
  const [pClass, setPClass] = useState("");

  const comp = competitions.find((c) => c.id === id);

  if (!comp) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Competition not found.</p>
        <button onClick={() => navigate("/hod/competitions")} className="text-brand-600 text-sm mt-2">
          Back to Competitions
        </button>
      </div>
    );
  }

  const coordinator = faculty.find((f) => f.id === comp.coordinatorId);

  const handleDelete = () => {
    if (confirm(`Delete competition "${comp.name}"? This action cannot be easily undone.`)) {
      deleteCompetition(comp.id);
      navigate("/hod/competitions");
    }
  };

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (!pName.trim()) return;
    addParticipant(comp.id, pName.trim(), pClass.trim());
    setPName("");
    setPClass("");
  };

  const getResult = (participantId) => comp.results.find((r) => r.participantId === participantId);

  const handleResultChange = (participantId, field, value) => {
    const existing = getResult(participantId) || { position: "", score: "" };
    const updated = { ...existing, [field]: value };
    saveResult(comp.id, participantId, updated.position || 0, updated.score || 0);
  };

  const ranked = [...comp.results].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/hod/competitions")}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Competitions
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{comp.name}</h1>
            <p className="text-slate-400 text-sm mt-1">{comp.category}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin size={13} /> {comp.venue}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Calendar size={13} /> {comp.date} • {comp.time}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <User size={13} /> {coordinator?.name || "Unassigned"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
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
              <Trash2 size={15} /> Delete
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3 text-sm">
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Category</span>
            <span className="font-medium text-slate-700">{comp.category}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Status</span>
            <span className="font-medium text-slate-700">{comp.status}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Venue</span>
            <span className="font-medium text-slate-700">{comp.venue}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-3">
            <span className="text-slate-400">Date & Time</span>
            <span className="font-medium text-slate-700">{comp.date} • {comp.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Coordinator</span>
            <span className="font-medium text-slate-700">{coordinator?.name || "Unassigned"}</span>
          </div>
        </div>
      )}

      {activeTab === "Participants" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Participants ({comp.participants.length})</h3>

          <div className="space-y-2 mb-4">
            {comp.participants.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-50">
                <div>
                  <p className="text-sm font-medium text-slate-800">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.className}</p>
                </div>
                <button onClick={() => removeParticipant(comp.id, p.id)} className="text-slate-400 hover:text-rose-600">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {comp.participants.length === 0 && (
              <p className="text-slate-400 text-sm py-4 text-center">No participants added yet.</p>
            )}
          </div>

          <form onSubmit={handleAddParticipant} className="flex gap-2">
            <input
              value={pName}
              onChange={(e) => setPName(e.target.value)}
              placeholder="Participant / team name"
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <input
              value={pClass}
              onChange={(e) => setPClass(e.target.value)}
              placeholder="Class"
              className="w-28 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 rounded-xl">
              <Plus size={18} />
            </button>
          </form>
        </div>
      )}

      {activeTab === "Results & Ranking" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Enter Results</h3>
            <div className="space-y-3">
              {comp.participants.map((p) => {
                const r = getResult(p.id);
                return (
                  <div key={p.id} className="flex items-center gap-2">
                    <span className="text-sm text-slate-700 flex-1">{p.name}</span>
                    <input
                      type="number"
                      placeholder="Pos"
                      defaultValue={r?.position || ""}
                      onBlur={(e) => handleResultChange(p.id, "position", e.target.value)}
                      className="w-16 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-500"
                    />
                    <input
                      type="number"
                      placeholder="Score"
                      defaultValue={r?.score || ""}
                      onBlur={(e) => handleResultChange(p.id, "score", e.target.value)}
                      className="w-20 border border-slate-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:border-brand-500"
                    />
                  </div>
                );
              })}
              {comp.participants.length === 0 && (
                <p className="text-slate-400 text-sm py-4 text-center">Add participants first.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4">Ranking</h3>
            <div className="space-y-2">
              {ranked.map((r) => {
                const participant = comp.participants.find((p) => p.id === r.participantId);
                return (
                  <div key={r.participantId} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                    <Medal size={18} className={medalColor[r.position] || "text-slate-300"} />
                    <span className="text-sm font-medium text-slate-800 flex-1">{participant?.name}</span>
                    <span className="text-xs text-slate-400">#{r.position}</span>
                    <span className="text-xs font-semibold text-brand-600">{r.score} pts</span>
                  </div>
                );
              })}
              {ranked.length === 0 && (
                <p className="text-slate-400 text-sm py-4 text-center">No results entered yet.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showEdit && <AddCompetitionModal editData={comp} onClose={() => setShowEdit(false)} />}
    </div>
  );
}
