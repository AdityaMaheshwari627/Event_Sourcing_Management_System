function SummaryCard({ title, amount, change, icon, color }) {
  return (
    <div
      className={`${color} relative overflow-hidden rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between">

        <div className="z-10">

          <p className="text-sm font-medium text-white/80">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white break-words">
            {amount}
          </h2>

          <p className="mt-4 text-sm text-white/90">
            {change}
          </p>

        </div>

        <div className="z-10 text-5xl text-white/90">
          {icon}
        </div>

      </div>

      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10"></div>
    </div>
  );
}

export default SummaryCard;