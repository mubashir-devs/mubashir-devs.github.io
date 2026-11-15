import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-relaxed text-zinc-400">{children}</p>}
    </Reveal>
  )
}
