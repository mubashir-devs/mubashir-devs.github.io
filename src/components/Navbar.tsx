import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
] as const

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled || open ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent2 text-xs font-bold text-ink">M</span>
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="rounded-full px-3.5 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="ml-2 rounded-full border border-line bg-white/5 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-zinc-300 hover:bg-white/5 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5 md:hidden">
          {[...links, ['Resume', site.resume] as const].map(([label, href]) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-zinc-300 hover:bg-white/5 hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
