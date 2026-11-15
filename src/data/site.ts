/**
 * Single source of truth for personal details and site configuration.
 * Edit this file to change anything about you — no component edits needed.
 */
export const site = {
  name: 'Mubashir Ali',
  title: 'Senior Software Engineer',
  location: 'Lahore, Pakistan',
  email: 'mubashir.devs@gmail.com',
  github: 'https://github.com/mubashir-devs',
  linkedin: 'https://www.linkedin.com/in/mubashir-ali-26471a2b4/',
  resume: '/Mubashir_Ali.pdf',
  headline: 'I build secure, reliable software — from backend services to the interfaces people use.',
  intro:
    '5+ years across enterprise security and remote-access products. Most recently the primary technical owner of an enterprise remote-access platform — architecture, backend, agents and UI.',
  // Optional: paste a Formspree (https://formspree.io) endpoint to make the contact form deliver
  // messages directly. Leave empty to fall back to opening the visitor's email client.
  formEndpoint: '',
}

export const github = {
  username: 'mubashir-devs',
  /** Repository names that should never appear on the site. */
  excludeRepos: ['mubashir-devs', 'mubashir-devs.github.io'] as string[],
  /** Hide forked repositories. */
  excludeForks: true,
  /** Hide archived repositories. */
  excludeArchived: false,
  /** Repos with this topic are pinned first and badged "Featured". */
  featuredTopic: 'portfolio-featured',
  /** Repos with this topic are never shown. */
  hiddenTopic: 'portfolio-hidden',
  /** How long (ms) cached API responses are served without re-checking GitHub. */
  cacheTtlMs: 30 * 60 * 1000,
}
