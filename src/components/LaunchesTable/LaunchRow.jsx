import { formatDateTime } from '../../utils/formatDate'

const statusStyles = {
  success:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  failure: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
  upcoming: 'bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
  unknown:
    'bg-slate-100 text-slate-600 dark:bg-slate-500/10 dark:text-slate-300',
}

export default function LaunchRow({ launch, isSelected, onSelect }) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(launch.id)
    }
  }

  return (
    <tr
      tabIndex={0}
      onClick={() => onSelect(launch.id)}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:focus-visible:bg-slate-800/60 ${
        isSelected ? 'bg-indigo-50 dark:bg-indigo-500/10' : ''
      }`}
    >
      <td className="px-4 py-3">
        <p className="font-semibold text-slate-800 dark:text-slate-100">
          {launch.name}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {launch.missionType}
        </p>
      </td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        {launch.agency}
      </td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        {launch.rocket}
      </td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        <p>{launch.pad}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {launch.location}
        </p>
      </td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
        {formatDateTime(launch.date)}
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            statusStyles[launch.statusCategory] ?? statusStyles.unknown
          }`}
        >
          {launch.status}
        </span>
      </td>
    </tr>
  )
}
