import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ExternalLink, GitFork, RefreshCw, Star, Sparkles, WifiOff } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { GithubIcon } from '../components/Icons'
import { useProjects } from '../hooks/useProjects'
import { formatDate, languageColor, type GitHubError, type Project } from '../lib/github'
import { site } from '../data/site'

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.li layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} className="card flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="break-words text-lg font-semibold text-white">{p.name}</h3>
        {p.featured && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-medium text-accent">
            <Sparkles size={11} aria-hidden="true" /> Featured
          </span>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{p.description ?? 'No description provided.'}</p>

      {p.topics.filter((t) => !t.startsWith('portfolio-')).length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.topics
            .filter((t) => !t.startsWith('portfolio-'))
            .slice(0, 4)
            .map((t) => (
              <li key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
                {t}
              </li>
            ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-400">
        {p.language && (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: languageColor(p.language) }} aria-hidden="true" />
            {p.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1" title="Stars">
          <Star size={13} aria-hidden="true" /> {p.stargazers_count}
          <span className="sr-only"> stars</span>
        </span>
        <span className="inline-flex items-center gap-1" title="Forks">
          <GitFork size={13} aria-hidden="true" /> {p.forks_count}
          <span className="sr-only"> forks</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        Updated <time dateTime={p.pushed_at}>{formatDate(p.pushed_at)}</time> · Created <time dateTime={p.created_at}>{formatDate(p.created_at)}</time>
      </p>

      <div className="mt-5 flex gap-2">
        <a href={p.html_url} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
          <GithubIcon className="h-4 w-4" /> View on GitHub
        </a>
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90">
            <ExternalLink size={14} aria-hidden="true" /> Live Demo
          </a>
        )}
      </div>
    </motion.li>
  )
}

function Skeletons() {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className="card p-6">
          <div className="skeleton h-5 w-2/3 rounded" />
          <div className="skeleton mt-4 h-3 w-full rounded" />
          <div className="skeleton mt-2 h-3 w-4/5 rounded" />
          <div className="skeleton mt-8 h-3 w-1/2 rounded" />
          <div className="skeleton mt-6 h-9 w-full rounded-lg" />
        </li>
      ))}
    </ul>
  )
}

function ErrorState({ error, onRetry }: { error: GitHubError; onRetry: () => void }) {
  const rateLimited = error.kind === 'rate-limit'
  const Icon = error.kind === 'network' ? WifiOff : AlertTriangle
  return (
    <div role="alert" className="card mx-auto flex max-w-xl flex-col items-center p-10 text-center">
      <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-400">
        <Icon size={26} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-white">{rateLimited ? 'GitHub is rate limiting requests' : "Couldn't load projects"}</h3>
      <p className="mt-2 text-sm text-zinc-400">
        {error.message}
        {rateLimited && error.resetAt && ` Try again after ${error.resetAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {!rateLimited && (
          <button type="button" onClick={onRetry} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink">
            <RefreshCw size={14} aria-hidden="true" /> Try again
          </button>
        )}
        <a href={`${site.github}?tab=repositories`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5">
          Browse on GitHub
        </a>
      </div>
    </div>
  )
}

export function Projects() {
  const { state, retry } = useProjects()
  const [lang, setLang] = useState('All')

  const projects = state.status === 'success' ? state.projects : []
  const languages = useMemo(() => {
    const counts = new Map<string, number>()
    projects.forEach((p) => p.language && counts.set(p.language, (counts.get(p.language) ?? 0) + 1))
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l)
  }, [projects])

  // If the selected language vanishes (e.g. after a refetch), fall back to All.
  const activeLang = lang === 'All' || languages.includes(lang) ? lang : 'All'
  const visible = activeLang === 'All' ? projects : projects.filter((p) => p.language === activeLang)

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Projects" title="Open-source work, straight from GitHub">
        This section is generated live from my public repositories — new ones appear automatically.
      </SectionHeading>

      {state.status === 'loading' && (
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading repositories…</span>
          <Skeletons />
        </div>
      )}

      {state.status === 'error' && <ErrorState error={state.error} onRetry={retry} />}

      {state.status === 'success' && (
        <>
          {state.stale && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
              <WifiOff size={13} aria-hidden="true" /> GitHub is unreachable right now — showing recently saved data.
            </p>
          )}

          {projects.length === 0 ? (
            <p className="card p-10 text-center text-zinc-400">No public repositories to show yet — check back soon.</p>
          ) : (
            <>
              {languages.length > 0 && (
                <div role="group" aria-label="Filter projects by language" className="mb-8 flex flex-wrap gap-2">
                  {['All', ...languages].map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={activeLang === l}
                      onClick={() => setLang(l)}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                        activeLang === l ? 'border-accent/60 bg-accent/15 text-white' : 'border-line text-zinc-400 hover:text-white'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((p) => (
                    <ProjectCard key={p.id} p={p} />
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-10 text-center">
                <a href={`${site.github}?tab=repositories`} target="_blank" rel="noreferrer" className="text-sm text-zinc-400 underline-offset-4 hover:text-white hover:underline">
                  See everything on GitHub →
                </a>
              </div>
            </>
          )}
        </>
      )}
    </section>
  )
}
