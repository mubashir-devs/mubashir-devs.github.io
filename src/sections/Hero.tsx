import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { site } from '../data/site'
import { GithubIcon, LinkedinIcon } from '../components/Icons'

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute left-1/2 top-0 -z-10 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px]" aria-hidden="true" />
      <div className="absolute right-0 top-40 -z-10 h-72 w-72 rounded-full bg-accent2/10 blur-[120px]" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-xs text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <MapPin size={12} aria-hidden="true" /> {site.location}
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-7xl">
            Hi, I'm <span className="text-gradient">{site.name}</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-accent sm:text-base">{site.title}</p>
          <p className="mt-6 max-w-2xl text-xl font-medium leading-snug text-zinc-200 sm:text-2xl">{site.headline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{site.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]">
              View Projects <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Contact Me
            </a>
            <a href={site.resume} download className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
              <Download size={16} /> Resume
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="grid h-11 w-11 place-items-center rounded-full border border-line text-zinc-300 transition-colors hover:border-accent/50 hover:text-white">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="grid h-11 w-11 place-items-center rounded-full border border-line text-zinc-300 transition-colors hover:border-accent/50 hover:text-white">
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
