import { Code2, Cloud, Database, LayoutTemplate, Server, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

const categories: { title: string; icon: LucideIcon; skills: string[] }[] = [
  { title: 'Programming Languages', icon: Code2, skills: ['C++ (17/20)', 'Go', 'Python', 'JavaScript', 'SQL', 'Bash', 'PowerShell'] },
  { title: 'Frontend Development', icon: LayoutTemplate, skills: ['Vue.js', 'Quasar', 'HTML', 'CSS', 'Qt', 'Responsive UI', 'Embedded web UIs'] },
  { title: 'Backend Development', icon: Server, skills: ['Django', 'HTTP/HTTPS APIs', 'WebSockets', 'NATS', 'JWT & RBAC', 'SSL/TLS · mTLS · DTLS', 'Multithreaded services'] },
  { title: 'Databases', icon: Database, skills: ['PostgreSQL', 'SQLite', 'SQL', 'JSON', 'Protocol Buffers', 'MsgPack'] },
  { title: 'Developer Tools', icon: Wrench, skills: ['Git', 'GitHub', 'Bitbucket', 'CMake', 'vcpkg', 'QMake / MSBuild', 'JIRA'] },
  { title: 'Cloud & DevOps', icon: Cloud, skills: ['Jenkins CI/CD', 'MSI / DEB / RPM / PKG packaging', 'Cloud control planes', 'Load testing', 'Release engineering'] },
]

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Skills" title="Tools I work with" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ title, icon: Icon, skills }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.07} className="card group p-6">
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl border border-line bg-gradient-to-br from-accent/20 to-accent2/10 text-accent transition-transform group-hover:scale-110">
              <Icon size={20} aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-white">{title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <li key={s} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
