import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const stats = [
  ['5+', 'Years of experience'],
  ['3', 'Platforms shipped (Win / Linux / macOS)'],
  ['2×', 'Annual Best Performer (2024, 2025)'],
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="About" title="Engineering across the whole stack" />
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-zinc-400">
          <p>
            I'm a Senior Software Engineer with 5+ years in enterprise security and remote-access products. I build end to end: backend APIs and orchestration services, authentication and access control,
            cross-platform client software, and the web front ends that sit on top.
          </p>
          <p>
            I started on endpoint agents for a Zero Trust Network Access platform at Ebryx — secure networking, device posture, onboarding and packaging for Windows, Linux and macOS — and grew into leading
            design discussions, code reviews and mentoring. Most recently at Gigalabs I became the primary technical owner of an enterprise remote-access tunnel platform, from architecture and
            documentation through backend, agent and UI.
          </p>
          <p>
            I enjoy debugging hard network and concurrency problems, writing documentation that people actually read, and working closely with QA, DevOps and Product to get releases out the door.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-4 self-start">
          {stats.map(([value, label]) => (
            <div key={label} className="card flex items-center gap-5 p-5">
              <span className="text-gradient text-4xl font-bold">{value}</span>
              <span className="text-sm text-zinc-400">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
