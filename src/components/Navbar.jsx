import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User, BookOpen, CalendarDays, Trophy, ChevronDown, FileClock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";
import { useSubjects } from "../context/SubjectContext";
import { useEvents } from "../context/EventContext";
import { useCompetitions } from "../context/CompetitionContext";
import { useCurrentUser } from "../context/CurrentUserContext";
import { useNotifications } from "../hooks/useNotifications";

const typeIcon = {
  leave: FileClock,
  event: CalendarDays,
  attendance: AlertTriangle,
  success: CheckCircle2,
  error: XCircle,
};

const typeColor = {
  leave: "text-amber-500 bg-amber-50",
  event: "text-brand-500 bg-brand-50",
  attendance: "text-rose-500 bg-rose-50",
  success: "text-emerald-500 bg-emerald-50",
  error: "text-rose-500 bg-rose-50",
};

export default function Navbar({ role = "HOD" }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fms_read_notifications") || "[]");
    } catch {
      return [];
    }
  });

  const boxRef = useRef(null);
  const switcherRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const { faculty } = useFaculty();
  const { subjects } = useSubjects();
  const { events } = useEvents();
  const { competitions } = useCompetitions();
  const { currentFacultyId, setCurrentFacultyId } = useCurrentUser();
  const notifications = useNotifications(role, currentFacultyId);

  const isFaculty = role === "Faculty";
  const activePerson = isFaculty
    ? faculty.find((f) => f.id === currentFacultyId) || faculty[0]
    : faculty.find((f) => f.designation === "HOD") || faculty[0];

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
      if (switcherRef.current && !switcherRef.current.contains(e.target)) setSwitcherOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadIds(allIds);
    localStorage.setItem("fms_read_notifications", JSON.stringify(allIds));
  };

  const goToNotification = (n) => {
    const updated = [...new Set([...readIds, n.id])];
    setReadIds(updated);
    localStorage.setItem("fms_read_notifications", JSON.stringify(updated));
    navigate(n.link);
    setNotifOpen(false);
  };

  const q = query.trim().toLowerCase();

  const facultyResults = q ? faculty.filter((f) => f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q)).slice(0, 4) : [];
  const subjectResults = q ? subjects.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)).slice(0, 4) : [];
  const eventResults = q ? events.filter((e) => e.name.toLowerCase().includes(q)).slice(0, 4) : [];
  const competitionResults = q ? competitions.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4) : [];

  const hasResults = facultyResults.length || subjectResults.length || eventResults.length || competitionResults.length;

  const goTo = (path) => {
    navigate(path);
    setQuery("");
    setOpen(false);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="relative w-80" ref={boxRef}>
        <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search faculty, subjects, events..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400"
          />
        </div>

        {open && q && (
          <div className="absolute top-12 left-0 w-full bg-white rounded-xl border border-slate-100 shadow-lg max-h-96 overflow-y-auto z-20">
            {!hasResults && <p className="text-sm text-slate-400 text-center py-6">No results for "{query}"</p>}

            {facultyResults.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase">Faculty</p>
                {facultyResults.map((f) => (
                  <button key={f.id} onClick={() => goTo(`/hod/faculty/${f.id}`)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 text-left">
                    <User size={15} className="text-brand-500" />
                    <div>
                      <p className="text-sm text-slate-800">{f.name}</p>
                      <p className="text-xs text-slate-400">{f.designation}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {subjectResults.length > 0 && (
              <div className="p-2 border-t border-slate-50">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase">Subjects</p>
                {subjectResults.map((s) => (
                  <button key={s.id} onClick={() => goTo("/hod/subjects")} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 text-left">
                    <BookOpen size={15} className="text-emerald-500" />
                    <div>
                      <p className="text-sm text-slate-800">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.code} • {s.className}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {eventResults.length > 0 && (
              <div className="p-2 border-t border-slate-50">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase">Events</p>
                {eventResults.map((e) => (
                  <button key={e.id} onClick={() => goTo(`/hod/events/${e.id}`)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 text-left">
                    <CalendarDays size={15} className="text-amber-500" />
                    <div>
                      <p className="text-sm text-slate-800">{e.name}</p>
                      <p className="text-xs text-slate-400">{e.startDate}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {competitionResults.length > 0 && (
              <div className="p-2 border-t border-slate-50">
                <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase">Competitions</p>
                {competitionResults.map((c) => (
                  <button key={c.id} onClick={() => goTo(`/hod/competitions/${c.id}`)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 text-left">
                    <Trophy size={15} className="text-rose-500" />
                    <div>
                      <p className="text-sm text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-5">
        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative text-slate-500 hover:text-slate-800">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute top-12 right-0 w-80 bg-white rounded-xl border border-slate-100 shadow-lg z-20 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
                <p className="font-semibold text-slate-800 text-sm">Notifications</p>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs font-medium text-brand-600">
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">You're all caught up.</p>
              ) : (
                <div className="p-2">
                  {notifications.map((n) => {
                    const Icon = typeIcon[n.type] || Bell;
                    const isUnread = !readIds.includes(n.id);
                    return (
                      <button
                        key={n.id}
                        onClick={() => goToNotification(n)}
                        className={`w-full flex items-start gap-3 px-2 py-2.5 rounded-lg text-left hover:bg-slate-50 ${isUnread ? "bg-brand-50/40" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                        </div>
                        {isUnread && <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 shrink-0"></span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative" ref={switcherRef}>
          <button onClick={() => isFaculty && setSwitcherOpen(!switcherOpen)} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-semibold">
              {activePerson?.photo || "?"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-slate-800 leading-tight">{activePerson?.name || "—"}</p>
              <p className="text-xs text-slate-400">{role}</p>
            </div>
            {isFaculty && <ChevronDown size={14} className="text-slate-400" />}
          </button>

          {isFaculty && switcherOpen && (
            <div className="absolute top-12 right-0 w-56 bg-white rounded-xl border border-slate-100 shadow-lg z-20 p-2">
              <p className="text-xs font-semibold text-slate-400 px-2 py-1 uppercase">Logged in as (demo)</p>
              {faculty.filter((f) => f.designation !== "HOD").map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setCurrentFacultyId(f.id);
                    setSwitcherOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left ${f.id === currentFacultyId ? "bg-brand-50" : "hover:bg-slate-50"}`}
                >
                  <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-semibold">
                    {f.photo}
                  </div>
                  <div>
                    <p className="text-sm text-slate-800">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.designation}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
