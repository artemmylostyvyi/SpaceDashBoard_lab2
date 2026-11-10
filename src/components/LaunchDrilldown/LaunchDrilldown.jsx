import { formatDateTime } from '../../utils/formatDate'

const statusStyles = {
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  failure: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  upcoming: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
  unknown:
    'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
}

export default function LaunchDrilldown({ launch, onClose }) {
  if (!launch) {
    return (
      <div className="mt-5 rounded-xl border border-dashed border-slate-300 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Select a launch to see its rocket, pad, mission and status.
      </div>
    )
  }

  return (
    <aside className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-500/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase dark:text-indigo-300">
            Launch drilldown
          </p>
          <h3 className="text-lg font-bold">{launch.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {launch.missionType} · {launch.orbit}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-indigo-300 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100 dark:border-indigo-500/40 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
        >
          Close
        </button>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Agency
          </dt>
          <dd className="font-medium">{launch.agency}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Rocket
          </dt>
          <dd className="font-medium">{launch.rocket}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Launch pad
          </dt>
          <dd className="font-medium">{launch.pad}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Location
          </dt>
          <dd className="font-medium">{launch.location}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Date
          </dt>
          <dd className="font-medium">{formatDateTime(launch.date)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">
            Status
          </dt>
          <dd>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                statusStyles[launch.statusCategory] ?? statusStyles.unknown
              }`}
            >
              {launch.status}
            </span>
          </dd>
        </div>
      </dl>

      {launch.description ? (
        <p className="mt-4 border-t border-indigo-200 pt-3 text-sm text-slate-600 dark:border-indigo-500/30 dark:text-slate-300">
          {launch.description}
        </p>
      ) : null}
    </aside>
  )
}
