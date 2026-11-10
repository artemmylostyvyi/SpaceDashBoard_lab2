import { useMemo, useState } from 'react'
import DashboardView from './components/DashboardView/DashboardView'
import DashboardLayout from './components/layout/DashboardLayout'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import { useLaunches } from './hooks/useLaunches'
import { deriveAgencies } from './utils/deriveAgencies'
import { deriveKpis } from './utils/deriveKpis'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const {
    status,
    launches,
    upcomingLaunches,
    previousLaunches,
    meta,
    error,
    retry,
  } = useLaunches()

  const kpis = useMemo(
    () => deriveKpis({ upcomingLaunches, previousLaunches, meta }),
    [upcomingLaunches, previousLaunches, meta],
  )

  const agencies = useMemo(() => deriveAgencies(launches), [launches])

  return (
    <div className={isDark ? 'dark' : ''}>
      <DashboardLayout
        title="Space Launches Dashboard"
        subtitle="Lab 2 — live data from The Space Devs Launch Library 2"
        actions={
          <ThemeToggle
            isDark={isDark}
            onToggle={() => setIsDark((current) => !current)}
          />
        }
      >
        <DashboardView
          status={status}
          launches={launches}
          kpis={kpis}
          agencies={agencies}
          error={error}
          onRetry={retry}
        />
      </DashboardLayout>
    </div>
  )
}
