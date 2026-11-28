export interface FeatureItem {
  title: string;
  summary: string;
}

export interface FeatureScreenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface FeatureGroup {
  id: string;
  kicker: string;
  title: string;
  lede: string;
  icon: string;
  items: FeatureItem[];
  screenshots?: FeatureScreenshot[];
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'inventory-and-expiration',
    kicker: 'Inventory',
    title: 'Stock, nested locations, and expiration tracking',
    lede: 'Know what you have, where it sits, and what needs to be used next across every pantry shelf, fridge drawer, and chest freezer.',
    icon: 'package',
    items: [
      {
        title: 'Nested locations, categories, and starter taxonomy',
        summary: 'Organize household stock into hierarchies like Kitchen -> Refrigerator -> Crisper Drawer or Garage -> Chest Freezer, paired with custom categories and an optional onboarding starter taxonomy.',
      },
      {
        title: 'Due soon, overdue, and smart due-date rules',
        summary: 'Items approaching or past their best-by date surface automatically, while opening, freezing, or thawing recalculates due dates using rolling-average consumption history.',
      },
      {
        title: 'One-tap Quick Consume, sorting, and math inputs',
        summary: 'Log the soonest-due unit in one tap (with an Undo toast and per-user toggle), sort inventory server-side across every column, and type quick math expressions like 500/4 into number fields.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/due-soon.png',
        alt: 'itemized Due Soon view highlighting upcoming and overdue items with remaining days and quick actions',
        caption: 'Due Soon view surfacing items approaching or past their best-by dates.',
        width: 2560,
        height: 1600,
      },
      {
        src: '/docs/assets/locations.png',
        alt: 'itemized Locations view showing nested storage hierarchies across kitchen, pantry, refrigerator, and freezer',
        caption: 'Nested storage locations organized from rooms down to individual shelves and drawers.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'shopping-list',
    kicker: 'Restocking',
    title: 'Automatic shopping list',
    lede: 'Your shopping list stays current from the stock you actually have at home, without manual re-entry.',
    icon: 'shopping-cart',
    items: [
      {
        title: 'Minimum stock thresholds',
        summary: 'Set a minimum stock level on any product; when on-hand quantity drops below it, the item appears on your shopping list automatically.',
      },
      {
        title: 'One-click manual additions',
        summary: 'Add one-off items to the list manually from your phone or desktop whenever something comes up.',
      },
      {
        title: 'Clears automatically on restock',
        summary: 'Scan or purchase items as you unpack groceries and they clear from the shopping list as stock is replenished.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/shopping-list.png',
        alt: 'itemized Shopping List showing automatically populated low-stock items alongside manual additions',
        caption: 'Automatic shopping list populated from minimum stock thresholds and quick manual additions.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'barcode-and-qr-scanning',
    kicker: 'Scanning',
    title: 'Mobile and USB barcode / QR scanning',
    lede: 'One unified Scan / Action workflow built for your phone camera, native QR quick actions, and USB or Bluetooth scanners in the kitchen.',
    icon: 'scan-barcode',
    items: [
      {
        title: 'Unified Scan / Action workflow',
        summary: 'Scan retail UPC/EAN barcodes or printed itemized labels to Purchase, Consume, Open, Transfer, or run a Location Inventory Audit. Purchase and variant scans automatically ignore distracting manufacturer QR codes printed next to UPC barcodes.',
      },
      {
        title: 'Native-camera QR Quick Actions',
        summary: 'Point your phone’s built-in camera at any printed item (/go/i/:id), product (/go/p/:id), or location (/go/l/:id) QR label to open a mobile-first screen for one-tap Consume, Open, Transfer, Quick Add, or shelf filtering.',
      },
      {
        title: 'OpenFoodFacts lookup and optional AI naming',
        summary: 'Unknown retail barcodes are looked up automatically against OpenFoodFacts, with optional Anthropic, OpenAI, Gemini, or local Ollama integration to standardize messy names and merge records.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/scanner.png',
        alt: 'itemized Scan and Action workflow for camera and USB/Bluetooth barcode scanning with Purchase, Consume, Open, Transfer, and Audit modes',
        caption: 'Unified Scan / Action workflow supporting phone cameras and USB/Bluetooth barcode scanners.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'label-printing',
    kicker: 'Labels',
    title: 'Universal label printing and Visual Label Designer',
    lede: 'Design clean QR labels visually for any label size and print straight from itemized to thermal, AirPrint/CUPS, or local browser PDF printers with no companion print server.',
    icon: 'printer',
    items: [
      {
        title: 'Visual Label Designer with live preview',
        summary: 'Customize item, product, and location templates on a 3x3 anchor grid (Top Left through Bottom Right) with independent text alignment, font size, bold, icons, one-click reset, and a live preview switcher across configured printers and label sizes.',
      },
      {
        title: 'Six printer drivers, including Browser Print / PDF',
        summary: 'Print exact-size single- or multi-page batch PDFs in your browser with no dedicated label printer, or send directly over your LAN to Zebra ZPL (:9100), Zebra ZSB (IPP), Brother QL (:9100), Rollo/Munbyn/TSC/iDPRT (TSPL :9100), and CUPS / AirPrint / IPP Everywhere printers.',
      },
      {
        title: 'Any label size and flexible product label modes',
        summary: 'Use IPP roll-size auto-detection, built-in presets (such as 2.25" x 1.25" or Brother DK-1209), or custom mm/in dimensions with die-cut or continuous media. Set each product to none, per_item, or per_product labels, or skip printing and use retail UPCs.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/settings-printers.png',
        alt: 'itemized Label Printing panel showing configured printers and the Visual Label Designer with 3x3 anchor layout controls and live preview',
        caption: 'Universal label printer configuration and the Visual Label Designer with live size previews.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'notifications-and-integrations',
    kicker: 'Notifications & API',
    title: 'Daily push digests, Personal API Tokens, and Home Assistant',
    lede: 'Stay ahead of expiring food with native Web Push digests and connect itemized to Home Assistant, iOS Shortcuts, and custom scripts.',
    icon: 'bell',
    items: [
      {
        title: 'Native Web Push (VAPID) daily digests',
        summary: 'Enroll iOS Home Screen PWAs, Android devices, and desktop browsers directly with no third-party push account. Schedule daily digests for Expiring/Overdue items and Shopping List alerts in your server timezone.',
      },
      {
        title: 'Long-lived Personal API Tokens',
        summary: 'Create revocable Bearer tokens (itm_...) with optional expiration, stored as SHA-256 hashes and inheriting your account role even when Force OIDC is enabled.',
      },
      {
        title: 'Home Assistant REST summary and automations',
        summary: 'Poll GET /api/summary with Home Assistant’s built-in REST integration (no HACS component required) or call /api/* endpoints from iOS Shortcuts, Mealie/Tandoor bridges, and shell scripts.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/settings-notifications.png',
        alt: 'itemized Settings Notifications panel showing browser device enrollment, test notification controls, and daily digest schedule preferences',
        caption: 'Per-user Web Push device enrollment and configurable daily digest schedules.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'search-and-shortcuts',
    kicker: 'Speed',
    title: 'Instant search and keyboard shortcuts',
    lede: 'Built to feel immediate whether you are typing with one hand on a phone or flying through updates on a desktop.',
    icon: 'search',
    items: [
      {
        title: 'Typo-tolerant FTS5 trigram search',
        summary: 'Powered by SQLite FTS5 trigram indexing so partial names and minor typos still return instant matches.',
      },
      {
        title: 'Gmail-style desktop shortcuts',
        summary: 'Jump straight to views and actions with g i, g s, g d, g o, g a, n to create, and ? to open the shortcut reference.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/search.png',
        alt: 'itemized instant search results showing typo-tolerant SQLite FTS5 matching across household products and stock',
        caption: 'Instant typo-tolerant search backed by SQLite FTS5 trigram indexing.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'accounts-and-sso',
    kicker: 'Household',
    title: 'Household accounts, preferences, and OIDC SSO',
    lede: 'Share one inventory across everyone in your home with simple roles, per-user preferences, and support for your existing identity provider.',
    icon: 'users',
    items: [
      {
        title: 'Admin and Member roles with personal preferences',
        summary: 'Keep instance administration scoped to admins while every household member sets their own Light, Dark, or System appearance theme and Quick Actions preference.',
      },
      {
        title: 'Local password auth or OIDC SSO',
        summary: 'Sign in with local accounts or connect Authentik, Authelia, Pocket ID, Keycloak, or any standard OIDC provider using Auth Code + PKCE.',
      },
      {
        title: 'Auto-provisioning and force-OIDC',
        summary: 'Automatically create Member accounts on first OIDC login and optionally disable local password sign-in entirely.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/settings.png',
        alt: 'itemized Settings page displaying Personal and Admin navigation, user preferences, and household configuration controls',
        caption: 'Organized Personal and Admin settings for appearance, notifications, API tokens, accounts, and integrations.',
        width: 2560,
        height: 1600,
      },
    ],
  },
  {
    id: 'self-hosting',
    kicker: 'Architecture',
    title: 'Zero-dependency self-hosting',
    lede: 'Run it on a mini PC, NAS, Raspberry Pi, or Unraid server with minimal footprint and straightforward backups.',
    icon: 'server',
    items: [
      {
        title: 'Single Go binary + embedded React SPA',
        summary: 'Frontend and backend ship together in one binary with no external database server, message queue, or Redis required.',
      },
      {
        title: 'Single SQLite file in WAL mode',
        summary: 'Your entire household inventory lives in one /data/itemized.db file that is simple to inspect, move, and back up.',
      },
      {
        title: 'Multi-arch containers and Unraid template',
        summary: 'Pre-built linux/amd64 and linux/arm64 images on GitHub Container Registry plus an official Unraid Community Apps XML template.',
      },
    ],
  },
];

export const KEYBOARD_SHORTCUTS: readonly { keys: string[]; action: string }[] = [
  { keys: ['g', 'i'], action: 'Go to Inventory' },
  { keys: ['g', 's'], action: 'Go to Shopping List' },
  { keys: ['g', 'd'], action: 'Go to Due / Expiring' },
  { keys: ['g', 'o'], action: 'Go to Scan / Action' },
  { keys: ['g', 'a'], action: 'Go to Audit' },
  { keys: ['n'], action: 'Create new item or product' },
  { keys: ['?'], action: 'Show keyboard shortcuts' },
];
