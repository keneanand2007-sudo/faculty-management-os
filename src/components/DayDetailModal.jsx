import { useNavigate } from "react-router-dom";
import { X, MapPin, Calendar, User } from "lucide-react";
import { useFaculty } from "../context/FacultyContext";

const categoryBadge = {
  Function: "bg-brand-50 text-brand-700",
  Meeting: "bg-sky-50 text-sky-700",
  Exam: "bg-rose-50 text-rose-700",
  Holiday: "bg-emerald-50 text-emerald-700",
};

export default function DayDetailModal({ dateLabel, events, onClose }) {
  const { faculty } = useFaculty();
  const navigate = useNavigate();

  const goToDetail = (e) => {
    if (e.category === "Function" || e.category === "Meeting") {
      navigate(`/hod/events/${e.id}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">{dateLabel}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">Nothing scheduled on this day.</p>
        ) : (
          <div className="space-y-3">
            {events.map((e) => {
              const inCharge = faculty.find((f) => f.id === e.inChargeFacultyId);
              const clickable = e.category === "Function" || e.category === "Meeting";
              return (
                <div
                  key={e.id}
                  onClick={() => clickable && goToDetail(e)}
                  className={`rounded-xl border border-slate-100 p-4 ${clickable ? "cursor-pointer hover:border-brand-200 hover:bg-brand-50/30" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-slate-800">{e.name}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ml-2 ${categoryBadge[e.category || "Function"]}`}>
                      {e.category || "Function"}
                    </span>
                  </div>
                  {e.description && <p className="text-sm text-slate-500 mt-1.5">{e.description}</p>}
                  <div className="flex flex-wrap items-center gap-3 mt-2.5">
                    {e.venue && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin size={12} /> {e.venue}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar size={12} /> {e.startDate}{e.endDate !== e.startDate ? ` → ${e.endDate}` : ""}
                    </span>
                    {inCharge && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <User size={12} /> {inCharge.name}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
