export const SITE = {
  name: 'itemized',
  tagline: 'Self-hosted household inventory management, expiration tracking, barcode scanning, and direct Zebra ZPL label printing.',
  url: 'https://itemizedapp.com',
  demo: 'https://demo.itemizedapp.com',
  appRepo: 'https://github.com/itemizedapp/itemized',
  releases: 'https://github.com/itemizedapp/itemized/releases',
  issues: 'https://github.com/itemizedapp/itemized/issues',
  securityAdvisories: 'https://github.com/itemizedapp/itemized/security/advisories/new',
  unraidTemplate: 'https://github.com/itemizedapp/itemized/blob/main/unraid/itemized.xml',
  image: 'ghcr.io/itemizedapp/itemized:latest',
  ogImage: '/og-card.png',
  ogAlt: 'itemized — self-hosted household inventory management interface',
} as const;

export const NAV = {
  home: '/',
  features: '/features/',
  selfHost: '/self-host/',
  configuration: '/configuration/',
  install: '/install/',
  about: '/about/',
  security: '/security/',
  privacy: '/privacy/',
} as const;

export const PRIMARY_NAV: readonly { label: string; href: string }[] = [
  { label: 'Features', href: NAV.features },
  { label: 'Self-Host', href: NAV.selfHost },
  { label: 'Configuration', href: NAV.configuration },
  { label: 'Install', href: NAV.install },
];

export const FOOTER_GROUPS: readonly { title: string; links: readonly { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: NAV.features },
      { label: 'Live demo', href: SITE.demo },
      { label: 'Install as PWA', href: NAV.install },
    ],
  },
  {
    title: 'Setup',
    links: [
      { label: 'Self-host quick start', href: NAV.selfHost },
      { label: 'Configuration & printing', href: NAV.configuration },
      { label: 'HTTPS reverse proxy', href: `${NAV.selfHost}#https` },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'About', href: NAV.about },
      { label: 'Security', href: NAV.security },
      { label: 'Privacy', href: NAV.privacy },
    ],
  },
];
