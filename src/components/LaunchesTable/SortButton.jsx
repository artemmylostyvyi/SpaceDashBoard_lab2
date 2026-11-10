export default function SortButton({ field, label, sort, onSort }) {
  const isActive = sort.field === field
  const ariaSort = isActive
    ? sort.direction === 'asc'
      ? 'ascending'
      : 'descending'
    : 'none'

  return (
    <th scope="col" aria-sort={ariaSort} className="px-4 py-2 font-semibold">
      <button
        type="button"
        onClick={() => onSort(field)}
        className="flex items-center gap-1 tracking-wide uppercase transition hover:text-indigo-600 dark:hover:text-indigo-300"
      >
        {label}
        <span aria-hidden="true" className="text-[10px]">
          {isActive ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
        </span>
      </button>
    </th>
  )
}
