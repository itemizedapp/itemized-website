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
        title: 'Nested locations and categories',
        summary: 'Organize household stock into hierarchies like Kitchen -> Refrigerator -> Crisper Drawer or Garage -> Chest Freezer, paired with custom categories.',
      },
      {
        title: 'Due soon and overdue alerts',
        summary: 'Items approaching or past their best-by date surface automatically so food gets eaten before it spoils and goes to waste.',
      },
      {
        title: 'Smart due-date rules',
        summary: 'Adjust expiration dates automatically when you open, freeze, or thaw an item, backed by rolling-average consumption history.',
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
    lede: 'One unified Scan / Action workflow built for both your phone camera at the store and a USB or Bluetooth scanner in the kitchen.',
    icon: 'scan-barcode',
    items: [
      {
        title: 'Unified Scan / Action workflow',
        summary: 'Scan a retail UPC barcode or a printed itemized label to Purchase, Consume, Open, Transfer between locations, or run a Location Inventory Audit, with no label printer required to track items.',
      },
      {
        title: 'OpenFoodFacts automatic lookup',
        summary: 'Unknown retail barcodes are looked up automatically against OpenFoodFacts to populate product details.',
      },
      {
        title: 'Optional AI naming and record merging',
        summary: 'Connect Anthropic, OpenAI, Gemini, or a local Ollama endpoint to standardize messy retail product names, categorize items, and merge them with your existing records.',
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
    title: 'Direct LAN Zebra ZPL label printing',
    lede: 'Print durable QR labels for containers, pantry bins, and freezer bags straight from itemized to printers on your local network.',
    icon: 'printer',
    items: [
      {
        title: 'Raw TCP (:9100) ZPL and Zebra ZSB (IPP)',
        summary: 'Connect directly to networked Zebra ZPL printers on TCP port 9100 (such as ZD411, ZD421, ZD621, networked ZD220/ZD230, or legacy GK420d/GX420d) as well as Zebra ZSB printers over IPP, with no companion print server required.',
      },
      {
        title: 'Individual labels or existing UPCs',
        summary: 'Print individual barcode and QR labels with customizable Go-template ZPL layouts for items, products, and locations, or skip the printer and track stock with existing retail UPC barcodes.',
      },
      {
        title: 'QR codes linked to your instance',
        summary: 'Printed QR labels encode your BASE_URL so scanning any container or shelf opens it directly in itemized.',
      },
    ],
    screenshots: [
      {
        src: '/docs/assets/settings-printers.png',
        alt: 'itemized Printer Settings showing direct LAN Zebra ZSB IPP and Raw TCP ZPL printer configuration and Go-template label layouts',
        caption: 'Direct LAN Zebra ZPL printer setup and customizable Go-template label layouts.',
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
    title: 'Household accounts and OIDC SSO',
    lede: 'Share one inventory across everyone in your home with simple roles and support for your existing identity provider.',
    icon: 'users',
    items: [
      {
        title: 'Admin and Member roles',
        summary: 'Give household members everyday access while keeping instance settings and administration scoped to admins.',
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
        alt: 'itemized Settings page displaying household instance configuration, user management, and integration controls',
        caption: 'Instance settings for household accounts, authentication, and integrations.',
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
