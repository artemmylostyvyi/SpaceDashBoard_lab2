const comparators = {
  name: (first, second) => first.name.localeCompare(second.name),
  date: (first, second) =>
    new Date(first.date ?? 0).getTime() - new Date(second.date ?? 0).getTime(),
  agency: (first, second) => first.agency.localeCompare(second.agency),
}

export const SORT_FIELDS = [
  { value: 'name', label: 'Launch' },
  { value: 'date', label: 'Date' },
  { value: 'agency', label: 'Agency' },
]

export function sortLaunches(launches, { field, direction }) {
  const comparator = comparators[field] ?? comparators.date
  const factor = direction === 'desc' ? -1 : 1

  return [...launches].sort((first, second) => comparator(first, second) * factor)
}
