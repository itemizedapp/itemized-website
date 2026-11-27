import { SITE } from './site';

export interface EnvVar {
  name: string;
  defaultValue: string;
  description: string;
  category: 'core' | 'oidc' | 'llm' | 'demo';
  inAppEditable: boolean;
}

export const ENV_VARS: EnvVar[] = [
  {
    name: 'PORT',
    defaultValue: '8080',
    description: 'HTTP listen port inside the container or binary.',
    category: 'core',
    inAppEditable: false,
  },
  {
    name: 'DB_PATH',
    defaultValue: '/data/itemized.db',
    description: 'Path to the SQLite database file (WAL mode).',
    category: 'core',
    inAppEditable: false,
  },
  {
    name: 'PUID',
    defaultValue: '1000',
    description: 'User ID for running itemized and owning /data (99 in the Unraid template).',
    category: 'core',
    inAppEditable: false,
  },
  {
    name: 'PGID',
    defaultValue: '1000',
    description: 'Group ID for running itemized and owning /data (100 in the Unraid template).',
    category: 'core',
    inAppEditable: false,
  },
  {
    name: 'BASE_URL',
    defaultValue: '(request host)',
    description: 'Canonical HTTPS URL encoded into printed QR labels and OIDC redirect callbacks.',
    category: 'core',
    inAppEditable: true,
  },
  {
    name: 'TRUST_PROXY',
    defaultValue: 'false',
    description: 'Set to true behind a reverse proxy so rate limiting reads client IPs from X-Forwarded-For / X-Real-IP.',
    category: 'core',
    inAppEditable: false,
  },
  {
    name: 'OIDC_ISSUER',
    defaultValue: '(disabled)',
    description: 'OIDC issuer discovery URL (uses Authorization Code flow with PKCE).',
    category: 'oidc',
    inAppEditable: true,
  },
  {
    name: 'OIDC_CLIENT_ID',
    defaultValue: '(none)',
    description: 'Client ID registered with your OIDC identity provider.',
    category: 'oidc',
    inAppEditable: true,
  },
  {
    name: 'OIDC_CLIENT_SECRET',
    defaultValue: '(none)',
    description: 'Client secret for your OIDC identity provider.',
    category: 'oidc',
    inAppEditable: true,
  },
  {
    name: 'OIDC_AUTO_PROVISION',
    defaultValue: 'false',
    description: 'Automatically create Member accounts on a user’s first successful OIDC sign-in.',
    category: 'oidc',
    inAppEditable: true,
  },
  {
    name: 'OIDC_FORCE',
    defaultValue: 'false',
    description: 'Redirect the login page directly to your identity provider and disable local password login.',
    category: 'oidc',
    inAppEditable: true,
  },
  {
    name: 'LLM_PROVIDER',
    defaultValue: '(disabled)',
    description: 'Optional AI provider for UPC name normalization and categorization: anthropic, openai, gemini, or openai-compatible.',
    category: 'llm',
    inAppEditable: true,
  },
  {
    name: 'LLM_MODEL',
    defaultValue: '(none)',
    description: 'Model identifier for the configured LLM provider.',
    category: 'llm',
    inAppEditable: true,
  },
  {
    name: 'LLM_BASE_URL',
    defaultValue: '(none)',
    description: 'Custom API endpoint for openai-compatible servers (for example http://ollama:11434/v1).',
    category: 'llm',
    inAppEditable: true,
  },
  {
    name: 'LLM_API_KEY',
    defaultValue: '(none)',
    description: 'API key for the selected LLM provider (omit if your local endpoint does not require one).',
    category: 'llm',
    inAppEditable: true,
  },
  {
    name: 'DEMO_MODE',
    defaultValue: 'false',
    description: 'Run in public demo mode: bypasses login as demo admin, seeds sample household data, sandboxes outbound printer/OIDC/LLM calls, and rate-limits UPC lookup to 5/min.',
    category: 'demo',
    inAppEditable: false,
  },
  {
    name: 'DEMO_RESET_INTERVAL',
    defaultValue: '1h',
    description: 'Wall-clock-aligned reset interval for demo mode using Go duration syntax (for example 1h or 30m).',
    category: 'demo',
    inAppEditable: false,
  },
];

export const DOCKER_COMPOSE_SNIPPET = `services:
  itemized:
    image: ghcr.io/itemizedapp/itemized:latest
    container_name: itemized
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - ./data:/data
    environment:
      BASE_URL: https://itemized.example.com
      TRUST_PROXY: "true"
      TZ: America/New_York`;

export const DOCKER_RUN_SNIPPET = `docker run -d \\
  --name itemized \\
  --restart unless-stopped \\
  -p 8080:8080 \\
  -v /path/to/appdata/itemized:/data \\
  -e BASE_URL=https://itemized.example.com \\
  -e TRUST_PROXY=true \\
  -e TZ=America/New_York \\
  ghcr.io/itemizedapp/itemized:latest`;

export interface PrinterProtocol {
  name: string;
  badge?: string;
  endpoint: string;
  notes: string;
  examples: readonly string[];
  link?: {
    label: string;
    href: string;
  };
}

export const PRINTER_PROTOCOLS: readonly PrinterProtocol[] = [
  {
    name: 'Zebra ZSB Series (IPP)',
    badge: 'Most affordable option',
    endpoint: 'http://192.168.1.50:631/ipp/print',
    notes: 'The lowest-cost way to start printing individual barcode labels. Connects directly over Internet Printing Protocol on your LAN and works out of the box with Docker bridge networking.',
    examples: [
      'Zebra ZSB-DP12 (2-inch wireless thermal printer)',
      'Zebra ZSB-DP14 (4-inch wireless thermal printer)',
    ],
    link: {
      label: 'Explore Zebra ZSB Series',
      href: SITE.zebraZsb,
    },
  },
  {
    name: 'Networked Zebra ZPL Printers (Raw TCP :9100)',
    endpoint: '192.168.1.50:9100',
    notes: 'Sends raw ZPL commands directly to TCP port 9100 on any Ethernet or Wi-Fi Zebra thermal printer without a companion print server.',
    examples: [
      'Zebra ZD411, ZD421, and ZD621 (Ethernet or Wi-Fi)',
      'Zebra ZD220 and ZD230 (networked models)',
      'Zebra GK420d and GX420d (legacy networked models)',
      'Zebra ZT231 (networked industrial ZPL)',
    ],
  },
];
