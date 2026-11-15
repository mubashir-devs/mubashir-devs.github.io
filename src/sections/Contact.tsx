import { useState, type FormEvent } from 'react'
import { CheckCircle2, Mail, Send } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { GithubIcon, LinkedinIcon } from '../components/Icons'
import { site } from '../data/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-lg border border-line bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20'

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company')) return // honeypot: bots fill hidden fields

    if (!site.formEndpoint) {
      // No backend configured: hand the message to the visitor's email client.
      const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error()
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const links = [
    { href: `mailto:${site.email}`, label: 'Email', value: site.email, icon: <Mail size={18} aria-hidden="true" /> },
    { href: site.linkedin, label: 'LinkedIn', value: 'mubashir-ali-26471a2b4', icon: <LinkedinIcon className="h-[18px] w-[18px]" /> },
    { href: site.github, label: 'GitHub', value: 'mubashir-devs', icon: <GithubIcon className="h-[18px] w-[18px]" /> },
  ]

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Contact" title="Let's build something together">
        Open to senior engineering roles and interesting projects. The fastest way to reach me is email.
      </SectionHeading>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <Reveal className="space-y-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.label === 'Email' ? undefined : '_blank'} rel="noreferrer" className="card group flex items-center gap-4 p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white/5 text-accent">{l.icon}</span>
              <span className="min-w-0">
                <span className="block text-xs uppercase tracking-wider text-zinc-500">{l.label}</span>
                <span className="block truncate text-sm text-white">{l.value}</span>
              </span>
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm text-zinc-300">Name</label>
                <input id="name" name="name" required autoComplete="name" placeholder="Jane Doe" className={field} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm text-zinc-300">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={field} />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm text-zinc-300">Message</label>
              <textarea id="message" name="message" required rows={5} placeholder="Tell me about your project or role…" className={`${field} resize-y`} />
            </div>
            {/* Honeypot field — hidden from people, visible to bots */}
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={15} aria-hidden="true" />
            </button>

            <div role="status" aria-live="polite" className="min-h-5 text-sm">
              {status === 'sent' && (
                <p className="inline-flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {site.formEndpoint ? "Thanks — your message is on its way." : 'Opening your email client…'}
                </p>
              )}
              {status === 'error' && <p className="text-red-400">Something went wrong. Please email me directly at {site.email}.</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
