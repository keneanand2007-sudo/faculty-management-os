export default function StatCard({ icon: Icon, label, value, trend, color = "indigo" }) {
  const styles = {
    indigo: {
      bg: "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700",
      shadow: "shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40",
      iconBg: "bg-white/20",
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600",
      shadow: "shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40",
      iconBg: "bg-white/20",
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500",
      shadow: "shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40",
      iconBg: "bg-white/20",
    },
    rose: {
      bg: "bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600",
      shadow: "shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40",
      iconBg: "bg-white/20",
    },
  };

  const s = styles[color] || styles.indigo;

  return (
    <div className={`relative rounded-2xl p-5 ${s.bg} ${s.shadow} transition-all overflow-hidden text-white hover:-translate-y-1`}>
      <div className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      <div className="pointer-events-none absolute -bottom-8 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>

      <div className="relative flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.iconBg} backdrop-blur-sm`}>
          <Icon size={22} className="text-white" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-white bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
            {trend}
          </span>
        )}
      </div>

      <p className="relative text-2xl font-bold mt-4">{value}</p>
      <p className="relative text-sm text-white/80 mt-1">{label}</p>
    </div>
  );
}
