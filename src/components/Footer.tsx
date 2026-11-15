import { Mail } from 'lucide-react'
import { site } from '../data/site'
import { GithubIcon, LinkedinIcon } from './Icons'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-zinc-500 sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><GithubIcon className="h-5 w-5" /></a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><LinkedinIcon className="h-5 w-5" /></a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="hover:text-white"><Mail size={20} /></a>
        </div>
      </div>
    </footer>
  )
}
