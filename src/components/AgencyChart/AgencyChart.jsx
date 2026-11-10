export default function AgencyChart({ agencies }) {
  const maxLaunches = Math.max(...agencies.map((agency) => agency.launches), 1)

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">Launches by agency</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Loaded launches this year
      </p>

      <ul className="mt-5 space-y-3">
        {agencies.map((agency) => (
          <li key={agency.id}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{agency.name}</span>
              <span className="text-slate-500 dark:text-slate-400">
                {agency.launches}
              </span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all dark:bg-indigo-400"
                style={{ width: `${(agency.launches / maxLaunches) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
