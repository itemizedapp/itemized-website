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
  endpoint?: string;
  notes: string;
  examples: readonly string[];
  link?: {
    label: string;
    href: string;
  };
}

export const PRINTER_PROTOCOLS: readonly PrinterProtocol[] = [
  {
    name: 'Browser Print / PDF (Local Printer)',
    badge: 'No network printer needed',
    notes: 'Opens an exact-size single- or multi-page PDF (one label per page) right in your browser for manual prints, bulk reprints, Purchase / Quick Add workflows, and automatic Open or freeze/thaw due-date reprints.',
    examples: [
      'Any USB or local label printer installed on macOS, Windows, or Linux',
      'Standard desktop inkjet or laser printers via the browser print dialog',
    ],
  },
  {
    name: 'Zebra / ZPL Compatible (Raw TCP :9100)',
    endpoint: '192.168.1.50:9100',
    notes: 'Sends ZPL directly over TCP port 9100 to networked Ethernet or Wi-Fi Zebra thermal printers with no companion print server.',
    examples: [
      'Zebra ZD411, ZD421, and ZD621 (Ethernet or Wi-Fi)',
      'Zebra ZD220 and ZD230 (networked models)',
      'Zebra GK420d, GX420d, and industrial ZT231',
    ],
  },
  {
    name: 'Brother QL (TCP :9100)',
    endpoint: '192.168.1.50:9100',
    notes: 'Direct raster printing over your LAN to networked Brother QL thermal label printers, with built-in DK label presets.',
    examples: [
      'Brother QL-720NW',
      'Brother QL-810W',
      'Brother QL-820NWB',
    ],
  },
  {
    name: 'Rollo / Munbyn / TSC / iDPRT (TSPL :9100)',
    endpoint: '192.168.1.50:9100',
    notes: 'Direct TSPL2 printing over TCP port 9100 to networked TSPL-compatible thermal label printers.',
    examples: [
      'Networked Rollo and Munbyn thermal printers',
      'TSC and iDPRT Ethernet or Wi-Fi label printers',
    ],
  },
  {
    name: 'CUPS / AirPrint / IPP Everywhere (IPP PDF)',
    endpoint: 'http://192.168.1.50:631/printers/my-label-printer',
    notes: 'Sends exact-size PDF labels over IPP to AirPrint printers and USB thermal printers shared through CUPS on a Raspberry Pi, NAS, or Linux host.',
    examples: [
      'AirPrint and IPP Everywhere network printers',
      'USB DYMO, Rollo, Munbyn, or Brother QL-800 shared via CUPS',
    ],
  },
  {
    name: 'Zebra ZSB Series (IPP ZPL)',
    endpoint: 'http://192.168.1.50:631/ipp/print',
    notes: 'Direct IPP printing to Zebra ZSB wireless label printers on your local network, with IPP roll-size auto-detection.',
    examples: [
      'Zebra ZSB-DP12 (2-inch wireless thermal printer)',
      'Zebra ZSB-DP14 (4-inch wireless thermal printer)',
    ],
    link: {
      label: 'Explore Zebra ZSB Series',
      href: SITE.zebraZsb,
    },
  },
];
