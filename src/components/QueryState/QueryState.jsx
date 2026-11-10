export default function QueryState({ status, error, onRetry }) {
  if (status === 'loading') {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <span
            className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400"
            aria-hidden="true"
          />
          <p className="text-sm font-medium">Loading launches from the API...</p>
        </div>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-8 shadow-sm dark:border-rose-500/30 dark:bg-rose-500/10">
        <h2 className="text-lg font-semibold text-rose-700 dark:text-rose-300">
          Could not load launches
        </h2>
        <p className="mt-1 text-sm text-rose-600 dark:text-rose-300/80">
          {error ?? 'An unexpected error occurred while calling the API.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-400"
        >
          Retry
        </button>
      </section>
    )
  }

  if (status === 'empty') {
    return (
      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">No launches available</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The API returned an empty list for this period.
        </p>
      </section>
    )
  }

  return null
}
