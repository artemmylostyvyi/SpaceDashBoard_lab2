import { useCallback, useEffect, useState } from 'react'
import { fetchLaunches } from '../api/launches'

const currentYear = new Date().getUTCFullYear()

const initialState = {
  status: 'loading',
  launches: [],
  upcomingLaunches: [],
  previousLaunches: [],
  meta: {
    year: currentYear,
    completedThisYear: 0,
    upcomingThisYear: 0,
  },
  error: null,
}

export function useLaunches() {
  const [requestKey, setRequestKey] = useState(0)
  const [state, setState] = useState(initialState)

  const retry = useCallback(() => {
    setState((current) => ({ ...current, status: 'loading', error: null }))
    setRequestKey((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    async function load() {
      try {
        const data = await fetchLaunches({ signal: controller.signal })
        if (!isActive) return
        setState({ status: 'success', error: null, ...data })
      } catch (error) {
        if (!isActive || error.name === 'AbortError') return
        setState({ ...initialState, status: 'error', error: error.message })
      }
    }

    load()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [requestKey])

  return { ...state, retry }
}
