function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function deriveAgencies(launches) {
  const counts = new Map()

  for (const launch of launches) {
    counts.set(launch.agency, (counts.get(launch.agency) ?? 0) + 1)
  }

  return [...counts.entries()]
    .map(([name, launchCount]) => ({
      id: slugify(name),
      name,
      launches: launchCount,
    }))
    .sort((first, second) => second.launches - first.launches)
}
