const trendStyles = {
  up: 'text-emerald-600 dark:text-emerald-400',
  down: 'text-rose-600 dark:text-rose-400',
  neutral: 'text-slate-500 dark:text-slate-400',
}

export default function KpiCard({
  title,
  value,
  change,
  trend = 'neutral',
  hint,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className={`font-semibold ${trendStyles[trend] ?? trendStyles.neutral}`}>
          {change}
        </span>
        {hint ? (
          <span className="text-slate-400 dark:text-slate-500">{hint}</span>
        ) : null}
      </div>
    </article>
  )
}
