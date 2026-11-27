# Spec Delta

## MODIFIED Requirements

### Requirement: Configuration and Label Printing reference page
The Configuration page (`/configuration/`) SHALL document all supported environment variables, OIDC SSO options, optional LLM UPC normalization settings, demo mode settings, and direct LAN Zebra label printing setup including supported printer guidance.

#### Scenario: Environment variable reference
- **WHEN** an administrator visits `/configuration/`
- **THEN** a structured reference table lists every documented variable (`PORT`, `DB_PATH`, `PUID`, `PGID`, `BASE_URL`, `TRUST_PROXY`, `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_AUTO_PROVISION`, `OIDC_FORCE`, `LLM_PROVIDER`, `LLM_MODEL`, `LLM_BASE_URL`, `LLM_API_KEY`, `DEMO_MODE`, `DEMO_RESET_INTERVAL`) with defaults and descriptions, noting which settings can also be edited in the in-app Settings UI

#### Scenario: Direct LAN Zebra label printing guide
- **WHEN** a user looks up label printing on `/configuration/`
- **THEN** the page explains both supported direct LAN protocols—Zebra ZSB via IPP (`http://<printer-ip>:631/ipp/print`) and Raw TCP ZPL (`<printer-ip>:9100`)—along with customizable Go-template ZPL layouts for items, products, and locations, notes that no companion print server is required, and clarifies that a label printer is optional because items can also be tracked using their existing UPC barcodes

#### Scenario: Supported Zebra label printers reference
- **WHEN** a user evaluates which label printer to buy or connect on `/configuration/#printing`
- **THEN** the page leads with networked Zebra printers that support Raw TCP ZPL over port `9100` as the recommended option, lists concrete examples (such as ZD411, ZD421, ZD621, networked ZD220/ZD230, legacy networked GK420d/GX420d, and ZT231), notes that any networked Zebra printer speaking ZPL over TCP port `9100` is supported, and mentions the **Zebra ZSB Series** (e.g., ZSB-DP12 / ZSB-DP14) secondarily as discontinued by Zebra yet still supported over IPP with an external link to `https://www.zebra.com/content/smb/us/en.html`
