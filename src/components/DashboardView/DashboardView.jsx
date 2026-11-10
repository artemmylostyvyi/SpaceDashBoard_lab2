import AgencyChart from '../AgencyChart/AgencyChart'
import KpiCard from '../KpiCard/KpiCard'
import LaunchesTable from '../LaunchesTable/LaunchesTable'
import QueryState from '../QueryState/QueryState'

export default function DashboardView({
  status,
  launches,
  kpis,
  agencies,
  error,
  onRetry,
}) {
  const hasLaunches = launches.length > 0

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} {...kpi} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          {status === 'loading' ? <QueryState status="loading" /> : null}

          {status === 'error' ? (
            <QueryState status="error" error={error} onRetry={onRetry} />
          ) : null}

          {status === 'success' && !hasLaunches ? (
            <QueryState status="empty" />
          ) : null}

          {status === 'success' && hasLaunches ? (
            <LaunchesTable launches={launches} />
          ) : null}
        </div>

        <div className="flex flex-col gap-6">
          {status === 'success' && agencies.length > 0 ? (
            <AgencyChart agencies={agencies} />
          ) : null}
        </div>
      </section>
    </>
  )
}
