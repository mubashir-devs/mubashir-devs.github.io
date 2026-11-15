import { github } from '../data/site'

export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  fork: boolean
  archived: boolean
}

export interface Project extends Repo {
  featured: boolean
  liveUrl: string | null
}

export type GitHubErrorKind = 'rate-limit' | 'not-found' | 'network' | 'http'

export class GitHubError extends Error {
  kind: GitHubErrorKind
  resetAt?: Date
  constructor(kind: GitHubErrorKind, message: string, resetAt?: Date) {
    super(message)
    this.kind = kind
    this.resetAt = resetAt
  }
}

interface CacheEntry {
  at: number
  etag: string | null
  pages: number
  data: Repo[]
}

export interface FetchResult {
  projects: Project[]
  /** True when GitHub could not be reached and cached data was served instead. */
  stale: boolean
}

const CACHE_KEY = `gh-repos-v1:${github.username}`
const PER_PAGE = 100
const MAX_PAGES = 10
const API = 'https://api.github.com'

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    return raw ? (JSON.parse(raw) as CacheEntry) : null
  } catch {
    return null
  }
}

function writeCache(entry: CacheEntry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    /* storage full or unavailable — caching is best-effort */
  }
}

function toError(res: Response): GitHubError {
  if (res.status === 404) return new GitHubError('not-found', `GitHub user "${github.username}" was not found.`)
  const remaining = res.headers.get('x-ratelimit-remaining')
  if (res.status === 429 || (res.status === 403 && remaining === '0')) {
    const reset = Number(res.headers.get('x-ratelimit-reset'))
    return new GitHubError(
      'rate-limit',
      'GitHub API rate limit reached.',
      reset ? new Date(reset * 1000) : undefined,
    )
  }
  return new GitHubError('http', `GitHub responded with status ${res.status}.`)
}

async function fetchAllPages(cached: CacheEntry | null): Promise<{ data: Repo[]; etag: string | null; pages: number } | 'not-modified'> {
  const all: Repo[] = []
  let etag: string | null = null
  let page = 1

  for (; page <= MAX_PAGES; page++) {
    const url = `${API}/users/${github.username}/repos?sort=updated&per_page=${PER_PAGE}&page=${page}`
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    // Conditional requests that return 304 do not count against the rate limit.
    if (page === 1 && cached?.etag && cached.pages === 1) headers['If-None-Match'] = cached.etag

    let res: Response
    try {
      res = await fetch(url, { headers })
    } catch {
      throw new GitHubError('network', 'Could not reach GitHub. Check your connection.')
    }

    if (res.status === 304) return 'not-modified'
    if (!res.ok) throw toError(res)

    if (page === 1) etag = res.headers.get('etag')
    const batch = (await res.json()) as Repo[]
    all.push(...batch)
    if (batch.length < PER_PAGE) break
  }
  return { data: all, etag, pages: Math.min(page, MAX_PAGES) }
}

export function toProjects(repos: Repo[]): Project[] {
  return repos
    .filter((r) => {
      const topics = r.topics ?? []
      if (github.excludeRepos.map((n) => n.toLowerCase()).includes(r.name.toLowerCase())) return false
      if (github.excludeForks && r.fork) return false
      if (github.excludeArchived && r.archived) return false
      return !topics.includes(github.hiddenTopic)
    })
    .map((r) => ({
      ...r,
      topics: r.topics ?? [],
      featured: (r.topics ?? []).includes(github.featuredTopic),
      liveUrl: normalizeUrl(r.homepage),
    }))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      return Date.parse(b.pushed_at) - Date.parse(a.pushed_at)
    })
}

function normalizeUrl(url: string | null): string | null {
  const v = url?.trim()
  if (!v) return null
  const withProtocol = /^https?:\/\//i.test(v) ? v : `https://${v}`
  try {
    return new URL(withProtocol).href
  } catch {
    return null
  }
}

/** Fetches public repositories, using a local cache and conditional requests to stay within rate limits. */
export async function fetchProjects(): Promise<FetchResult> {
  const cached = readCache()
  const fresh = cached && Date.now() - cached.at < github.cacheTtlMs
  if (cached && fresh) return { projects: toProjects(cached.data), stale: false }

  try {
    const result = await fetchAllPages(cached)
    if (result === 'not-modified' && cached) {
      writeCache({ ...cached, at: Date.now() })
      return { projects: toProjects(cached.data), stale: false }
    }
    if (result === 'not-modified') throw new GitHubError('http', 'Unexpected empty response from GitHub.')
    writeCache({ at: Date.now(), ...result })
    return { projects: toProjects(result.data), stale: false }
  } catch (err) {
    // Degrade gracefully: show the last known data rather than an error page.
    if (cached) return { projects: toProjects(cached.data), stale: true }
    throw err instanceof GitHubError ? err : new GitHubError('network', 'Something went wrong while loading repositories.')
  }
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/** Approximate GitHub language colours for the dot indicator. */
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Go: '#00ADD8',
  'C++': '#f34b7d',
  C: '#7a7a7a',
  'C#': '#178600',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#7e57c2',
  Vue: '#41b883',
  Shell: '#89e051',
  Rust: '#dea584',
  PowerShell: '#5391fe',
  Dockerfile: '#384d54',
  CMake: '#da3434',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
}
export const languageColor = (lang: string) => LANG_COLORS[lang] ?? '#94a3b8'
