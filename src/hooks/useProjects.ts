import { useCallback, useEffect, useState } from 'react'
import { fetchProjects, GitHubError, type Project } from '../lib/github'

type State =
  | { status: 'loading' }
  | { status: 'success'; projects: Project[]; stale: boolean }
  | { status: 'error'; error: GitHubError }

export function useProjects() {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setState({ status: 'loading' })
    fetchProjects()
      .then((r) => !cancelled && setState({ status: 'success', projects: r.projects, stale: r.stale }))
      .catch((e: GitHubError) => !cancelled && setState({ status: 'error', error: e }))
    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = useCallback(() => setAttempt((n) => n + 1), [])
  return { state, retry }
}
