import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Calendar, Users, Trophy, Cpu, Palette, Dumbbell } from "lucide-react";
import { useCompetitions } from "../context/CompetitionContext";
import StatCard from "../components/StatCard";
import AddCompetitionModal from "../components/AddCompetitionModal";

const categoryStyle = {
  Technical: { icon: Cpu, color: "bg-brand-50 text-brand-600" },
  Cultural: { icon: Palette, color: "bg-rose-50 text-rose-600" },
  Sports: { icon: Dumbbell, color: "bg-emerald-50 text-emerald-600" },
};

const statusColors = {
  Upcoming: "bg-sky-50 text-sky-600",
  Ongoing: "bg-amber-50 text-amber-600",
  Completed: "bg-emerald-50 text-emerald-600",
};

export default function Competitions() {
  const { competitions } = useCompetitions();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const totalParticipants = competitions.reduce((sum, c) => sum + c.participants.length, 0);
  const winners = competitions.reduce((sum, c) => sum + c.results.filter((r) => r.position === 1).length, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Competitions</h1>
          <p className="text-slate-400 text-sm">{competitions.length} competitions tracked</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <Plus size={18} />
          Create Competition
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Trophy} label="Total Competitions" value={competitions.length} color="indigo" />
        <StatCard icon={Cpu} label="Technical" value={competitions.filter((c) => c.category === "Technical").length} color="green" />
        <StatCard icon={Users} label="Participants" value={totalParticipants} color="amber" />
        <StatCard icon={Trophy} label="Winners" value={winners} color="rose" />
      </div>

      {competitions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center">
          <p className="font-semibold text-slate-700">No Competitions Found</p>
          <p className="text-slate-400 text-sm mt-1">Create your first competition to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {competitions.map((c) => {
            const CatIcon = categoryStyle[c.category].icon;
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/hod/competitions/${c.id}`)}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-200 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${categoryStyle[c.category].color}`}>
                    <CatIcon size={20} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-800 mt-3">{c.name}</h3>
                <p className="text-xs text-slate-400">{c.category}</p>

                <div className="mt-4 space-y-1.5">
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <MapPin size={13} /> {c.venue}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Calendar size={13} /> {c.date}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Users size={13} /> {c.participants.length} participants
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && <AddCompetitionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
