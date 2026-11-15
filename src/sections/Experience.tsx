import { Award, Briefcase, GraduationCap, type LucideIcon } from 'lucide-react'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'

interface Item {
  icon: LucideIcon
  role: string
  org: string
  meta?: string
  points: string[]
}

const items: Item[] = [
  {
    icon: Briefcase,
    role: 'Senior Software Engineer',
    org: 'Gigalabs (Pvt.) Ltd., Lahore',
    points: [
      'Primary technical owner of an enterprise remote-access tunnel platform, from system design through implementation and documentation.',
      'Designed the end-to-end architecture covering backend services, agent communication, security controls, APIs and user workflows.',
      'Implemented JWT authentication, dynamic ACLs, role-based access control and session management.',
      'Integrated NATS-based messaging for tunnel lifecycle management; built reconnection, fault-recovery and synchronization logic.',
    ],
  },
  {
    icon: Briefcase,
    role: 'Senior Software Engineer',
    org: 'Ebryx (Pvt.) Ltd., Lahore',
    points: [
      'Led development of endpoint security capabilities for a Zero Trust Network Access platform on Windows, Linux and macOS.',
      'Delivered authentication, onboarding and identity features, including Google Authentication, against a cloud control plane.',
      'Led design discussions and code reviews, mentored engineers, and acted as technical liaison between QA, DevOps and Product.',
      'Led initiatives to expand test coverage and audits of code quality, dependencies and license compliance.',
    ],
  },
  {
    icon: Briefcase,
    role: 'Software Engineer',
    org: 'Ebryx (Pvt.) Ltd., Lahore',
    points: [
      'Developed core components of cross-platform endpoint agents: process monitoring, device inventory and policy enforcement.',
      'Built secure networking (SSL/TLS, DTLS, custom TCP/UDP protocols) for communication with controllers and gateways.',
      'Set up Jenkins pipelines producing MSI, DEB, RPM and PKG installers; wrote automated suites and ran load tests.',
    ],
  },
  {
    icon: GraduationCap,
    role: 'B.S. Computer Science',
    org: 'University of Engineering and Technology (UET), Lahore',
    meta: '09/2018 – 08/2022 · CGPA 3.313 / 4.0',
    points: [],
  },
  {
    icon: Award,
    role: 'Honors & Certifications',
    org: 'Recognition',
    points: [
      'Annual Best Performer (2025 and 2024); Quarterly Best Performer (2023); Quarterly Performer (2022).',
      'AI Fluency Framework & Foundations — Certificate of Completion.',
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Experience" title="Where I've worked and studied" />
      <ol className="relative ml-5 border-l border-line">
        {items.map(({ icon: Icon, role, org, meta, points }, i) => (
          <li key={role + org}>
            <Reveal delay={i * 0.04} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[21px] top-0 grid h-10 w-10 place-items-center rounded-full border border-line bg-panel text-accent">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white">{role}</h3>
                <p className="mt-0.5 text-sm text-accent">{org}</p>
                {meta && <p className="mt-1 font-mono text-xs text-zinc-500">{meta}</p>}
                {points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-zinc-400">
                    {points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-600" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
