export interface FeatureItem {
  title: string;
  summary: string;
}

export interface FeatureGroup {
  id: string;
  kicker: string;
  title: string;
  lede: string;
  icon: string;
  items: FeatureItem[];
}

export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    id: 'inventory-and-expiration',
    kicker: 'Inventory',
    title: 'Stock, nested locations, and expiration tracking',
    lede: 'Know what you have, where it sits, and what needs to be used next—across every pantry shelf, fridge drawer, and chest freezer.',
    icon: 'package',
    items: [
      {
        title: 'Nested locations and categories',
        summary: 'Organize household stock into hierarchies like Kitchen -> Refrigerator -> Crisper Drawer or Garage -> Chest Freezer, paired with custom categories.',
      },
      {
        title: 'Due soon and overdue alerts',
        summary: 'Items approaching or past their best-by date surface automatically so food and supplies get used before they spoil.',
      },
      {
        title: 'Smart due-date rules',
        summary: 'Adjust expiration dates automatically when you open, freeze, or thaw an item, backed by rolling-average consumption history.',
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
        summary: 'Scan a barcode or itemized QR label to Purchase, Consume, Open, Transfer between locations, or run a Location Inventory Audit.',
      },
      {
        title: 'OpenFoodFacts automatic lookup',
        summary: 'Unknown retail barcodes are looked up automatically against OpenFoodFacts to populate product details.',
      },
      {
        title: 'Optional AI naming and categorization',
        summary: 'Connect Anthropic, OpenAI, Gemini, or a local Ollama endpoint to normalize messy UPC titles and suggest categories on your terms.',
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
        title: 'Zebra ZSB (IPP) and Raw TCP (:9100)',
        summary: 'Talks directly to Zebra ZSB printers over IPP and standard networked ZPL printers on TCP port 9100—no companion print server required.',
      },
      {
        title: 'Customizable Go-template ZPL layouts',
        summary: 'Tailor label layouts for individual items, products, and storage locations using Go templates.',
      },
      {
        title: 'QR codes linked to your instance',
        summary: 'Printed QR labels encode your BASE_URL so scanning any container or shelf opens it directly in itemized.',
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
