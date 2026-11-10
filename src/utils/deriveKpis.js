import { formatDateTime } from './formatDate'

const DAY_MS = 24 * 60 * 60 * 1000

function formatNearestValue(date) {
  const diff = new Date(date).getTime() - Date.now()

  if (diff <= 0) return 'Now'

  const days = Math.ceil(diff / DAY_MS)
  if (days > 1) return `${days} days`

  const hours = Math.max(1, Math.ceil(diff / (60 * 60 * 1000)))
  return `${hours} h`
}

export function deriveKpis({ upcomingLaunches, previousLaunches, meta }) {
  const now = Date.now()

  const nextLaunch = upcomingLaunches
    .filter((launch) => launch.date && new Date(launch.date).getTime() >= now)
    .sort(
      (first, second) =>
        new Date(first.date).getTime() - new Date(second.date).getTime(),
    )[0]

  const completedLaunches = previousLaunches.filter(
    (launch) =>
      launch.statusCategory === 'success' ||
      launch.statusCategory === 'failure',
  )
  const successfulLaunches = completedLaunches.filter(
    (launch) => launch.statusCategory === 'success',
  )
  const successRate = completedLaunches.length
    ? ((successfulLaunches.length / completedLaunches.length) * 100).toFixed(1)
    : null

  const launchesThisYear = meta.completedThisYear + meta.upcomingThisYear

  return [
    {
      id: 'nearest-launch',
      title: 'Nearest launch',
      value: nextLaunch ? formatNearestValue(nextLaunch.date) : '—',
      change: nextLaunch ? nextLaunch.name : 'No upcoming launches',
      trend: 'neutral',
      hint: nextLaunch ? formatDateTime(nextLaunch.date) : 'Schedule is empty',
    },
    {
      id: 'launches-this-year',
      title: 'Launches this year',
      value: String(launchesThisYear),
      change: `${meta.upcomingThisYear} upcoming`,
      trend: 'up',
      hint: `${meta.year} · completed + scheduled`,
    },
    {
      id: 'success-rate',
      title: 'Success rate',
      value: successRate ? `${successRate}%` : '—',
      change: `${successfulLaunches.length}/${completedLaunches.length} successful`,
      trend: successRate && Number(successRate) >= 90 ? 'up' : 'down',
      hint: 'from completed launches this year',
    },
  ]
}
