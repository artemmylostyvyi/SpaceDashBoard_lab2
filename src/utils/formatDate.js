const formatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'UTC',
})

export function formatDate(isoDate) {
  if (!isoDate) return 'TBD'

  return formatter.format(new Date(isoDate))
}

export function formatDateTime(isoDate) {
  if (!isoDate) return 'TBD'

  return `${formatter.format(new Date(isoDate))}, ${timeFormatter.format(
    new Date(isoDate),
  )} UTC`
}
