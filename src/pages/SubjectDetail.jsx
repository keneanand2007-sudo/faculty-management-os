import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, CheckCircle2, Circle, CircleDot, StickyNote } from "lucide-react";
import { useSubjects } from "../context/SubjectContext";
import { useFaculty } from "../context/FacultyContext";

const statusStyle = {
  "Not Started": { icon: Circle, color: "text-slate-300" },
  "In Progress": { icon: CircleDot, color: "text-amber-500" },
  "Completed": { icon: CheckCircle2, color: "text-emerald-500" },
};

const noteColors = [
  { bg: "bg-amber-50", border: "border-amber-200", accent: "text-amber-600" },
  { bg: "bg-sky-50", border: "border-sky-200", accent: "text-sky-600" },
  { bg: "bg-rose-50", border: "border-rose-200", accent: "text-rose-600" },
  { bg: "bg-emerald-50", border: "border-emerald-200", accent: "text-emerald-600" },
  { bg: "bg-violet-50", border: "border-violet-200", accent: "text-violet-600" },
];

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { subjects, addTopic, cycleTopicStatus, deleteTopic, addNote, deleteNote } = useSubjects();
  const { faculty } = useFaculty();
  const [activeTab, setActiveTab] = useState("Topics");
  const [newTopic, setNewTopic] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const backPath = location.pathname.startsWith("/faculty") ? "/faculty/subjects" : "/hod/subjects";
  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Subject not found.</p>
        <button onClick={() => navigate(backPath)} className="text-brand-600 text-sm mt-2">Back</button>
      </div>
    );
  }

  const topics = subject.topics || [];
  const notes = subject.notes || [];
  const completedCount = topics.filter((t) => t.status === "Completed").length;
  const progressPct = topics.length > 0 ? Math.round((completedCount / topics.length) * 100) : 0;
  const facultyMember = faculty.find((f) => f.id === subject.facultyId);

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    addTopic(subject.id, newTopic.trim());
    setNewTopic("");
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    addNote(subject.id, noteTitle.trim(), noteContent.trim());
    setNoteTitle("");
    setNoteContent("");
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(backPath)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium">
        <ArrowLeft size={16} /> Back to Subjects
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h1 className="text-xl font-bold text-slate-800">{subject.name}</h1>
        <p className="text-slate-400 text-sm mt-1">{subject.code} • {subject.className} • Sem {subject.semester} • {facultyMember?.name}</p>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="text-slate-500">Syllabus Progress</span>
            <span className="font-semibold text-slate-700">{progressPct}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {completedCount} completed • {topics.length - completedCount} remaining • {topics.length} total topics • {notes.length} notes
          </p>
        </div>
      </div>

      <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-100 w-fit">
        {["Topics", "Notes"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === t ? "bg-brand-600 text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Topics" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Syllabus Topics</h3>

          <div className="space-y-1 mb-4">
            {topics.map((t) => {
              const { icon: Icon, color } = statusStyle[t.status];
              return (
                <div key={t.id} className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 group">
                  <button onClick={() => cycleTopicStatus(subject.id, t.id)} className={color}>
                    <Icon size={19} />
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${t.status === "Completed" ? "text-slate-400 line-through" : "text-slate-700"}`}>{t.name}</p>
                    {t.date && <p className="text-xs text-slate-400">Completed {t.date}</p>}
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    t.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                    t.status === "In Progress" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
                  }`}>
                    {t.status}
                  </span>
                  <button onClick={() => deleteTopic(subject.id, t.id)} className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
            {topics.length === 0 && (
              <p className="text-slate-400 text-sm py-6 text-center">No topics added yet. Break the syllabus into topics below.</p>
            )}
          </div>

          <form onSubmit={handleAddTopic} className="flex gap-2 pt-4 border-t border-slate-50">
            <input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a syllabus topic..."
              className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
            />
            <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-4 rounded-xl">
              <Plus size={18} />
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-2">Tip: click the circle icon to cycle a topic through Not Started → In Progress → Completed.</p>
        </div>
      )}

      {activeTab === "Notes" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <StickyNote size={18} className="text-amber-500" /> Add a Note
            </h3>
            <form onSubmit={handleAddNote} className="space-y-3">
              <input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="Note title (e.g. Unit I — Key Concepts)"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500"
              />
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note here..."
                rows={3}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-500 resize-none"
              />
              <button type="submit" className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                <Plus size={16} /> Add Note
              </button>
            </form>
          </div>

          {notes.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
              <p className="font-semibold text-slate-700">No Notes Yet</p>
              <p className="text-slate-400 text-sm mt-1">Add syllabus notes, unit summaries, or reminders above.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {notes.map((n, i) => {
                const c = noteColors[i % noteColors.length];
                return (
                  <div key={n.id} className={`rounded-2xl border p-5 ${c.bg} ${c.border} relative group`}>
                    <button
                      onClick={() => deleteNote(subject.id, n.id)}
                      className="absolute top-3 right-3 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={15} />
                    </button>
                    <p className={`font-semibold text-sm ${c.accent}`}>{n.title}</p>
                    <p className="text-sm text-slate-600 mt-2 whitespace-pre-line">{n.content}</p>
                    <p className="text-xs text-slate-400 mt-3">{n.date}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
